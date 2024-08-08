from mysql.connector import Error

from model.PortfolioHoldings import PortfolioHoldings
from repository.database_access import get_db_connection
from repository.transaction_repository import TransactionRepository

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
    def buy_holding(symbol,name,volume,price):
        try:
            conn = get_db_connection()
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
                                                                        'avg_cost': price}).execute()
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


if __name__ == "__main__":
    PortfolioHoldings.buy_holding('MICK','Microsoft',100,241433)