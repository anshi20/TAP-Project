from mysql.connector import Error
from postgrest import APIError

from model.PortfolioHoldings import PortfolioHoldings
from repository.database_access import get_db_connection
from repository.transaction_repository import TransactionRepository
from repository.userStatisticsRepository import UserStatisticsRepository

class PortfolioHoldings:

    @staticmethod
    def get_all_holdings():
        try:
            conn = get_db_connection()
            response = conn.table("portfolioholdings").select("*").execute()
            return response.data
        except Error as e:
            return -1
    
    @staticmethod
    def get_stock_history(symbol):
        try:
            conn = get_db_connection()
            response = conn.table("transactions").select("*").eq('symbol',symbol).execute()
            return response.data
        except Error as e:
            return -1

    @staticmethod
    def buy_holding(symbol,name,volume,price):
        try:
            conn = get_db_connection()
            current_money=conn.table('userstatistics').select("*").execute().data[0]["money"]
            if float(volume)*price>current_money:
                return -10
            holding_exists = conn.table("portfolioholdings").select("*").eq('symbol',symbol).execute()
            if not holding_exists.data:
                transaction_response = TransactionRepository.transaction_completed({
                                                       'volume': volume,
                                                       'price': price,
                                                       'symbol': symbol,
                                                       'name': name,
                                                       'transaction_type': 'BUY'})

                if transaction_response.data:
                   new_holding = conn.table("portfolioholdings").insert({'symbol': symbol,
                                                                        'volume': volume,
                                                                        'avg_cost': price,
                                                                        'name' : name}).execute()
                   return new_holding
                else:
                    return -1
            else:
                old_avg_cost = holding_exists.data[0]["avg_cost"]
                old_volume = holding_exists.data[0]["volume"]

                new_avg_cost = float(old_volume*old_avg_cost + volume*price)/(old_volume + volume)
                new_volume = volume + old_volume
                transaction_result = TransactionRepository.transaction_completed({
                                                       'volume': volume,
                                                       'price': price,
                                                       'symbol': symbol,
                                                       'name':name,
                                                       'transaction_type': 'BUY'})
                if transaction_result.data:
                   buy_old_holding = conn.table("portfolioholdings").update({"avg_cost": new_avg_cost, "volume": new_volume}).eq('symbol', symbol).execute()
                   return buy_old_holding
                else:
                    return -1
        except Error as e:
            print("error in buing holdings")
            return -1

    @staticmethod
    def sell_holding(symbol,name,volume,current_price):
        try:
            conn = get_db_connection()
            response = conn.table("portfolioholdings").select('*').eq('symbol',symbol).execute()
            if response.data:
                holding = response.data[0]
            else:
                holding = None

            
            if not holding:
                raise ValueError("Holding not found")
            if volume > holding['volume']:
                raise ValueError("Transaction can't be processed: Insufficient volume")
            if volume == holding['volume']:
                conn.table('portfolioholdings').delete().eq('symbol', symbol).execute()
            else:
                new_volume = holding['volume'] - volume
                new_avg_cost = float((holding['volume'] * holding['avg_cost']) - (volume * current_price)) / new_volume

                conn.table('portfolioholdings').update({'volume': new_volume, 'avg_cost': new_avg_cost}).eq('symbol', symbol).execute()
            
            TransactionRepository.transaction_completed({'name' : name,
                                                   'volume': volume,
                                                   'price': current_price,
                                                   'symbol': symbol,
                                                   'transaction_type': 'SELL'})
            result = conn.table("portfolioholdings").select('*').eq('symbol',symbol).execute()
            cur_holding = result.data[0] if result.data else None
            return cur_holding
        except APIError as e:
            print("The delete query was not successful!")
            return -1


if __name__ == "__main__":
    PortfolioHoldings.sell_holding('MICK','Microsoft',50,5496)