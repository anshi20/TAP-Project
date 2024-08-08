from datetime import datetime
import pytz
from mysql.connector import Error

from repository.database_access import get_db_connection

class TransactionRepository:

    @staticmethod
    def transaction_completed(transactional_data):
        #  print(transactional_data)
         transaction_type = transactional_data["transaction_type"]
         symbol = transactional_data["symbol"]
         name = transactional_data["name"]
         price = transactional_data["price"]
         volume = transactional_data["volume"]
         india_tz = pytz.timezone('Asia/Kolkata')
         transaction_timestamp = datetime.now(india_tz).strftime('%Y-%m-%d %H:%M:%S')

         try:
             conn = get_db_connection()
             add_transaction = conn.table('transactions').insert({'transaction_type': transaction_type,
                                                                    'symbol': symbol,
                                                                    'name': name,
                                                                    'price': price,                                                                   
                                                                    'volume': volume,
                                                                    'transaction_timestamp': transaction_timestamp}).execute()
             return add_transaction
         except Error as e:
             return -1


    @staticmethod
    def getAllTransactions():
        try:
            conn=get_db_connection()
            allTransactions=conn.table('transactions').select("*").execute()
            # print(allTransactions)
            return allTransactions.data
        except Error as e:
            return -1




if __name__ == "__main__":
    TransactionRepository.transaction_completed({'transaction_type':'BUY','symbol' :'AAPL','name' :'apple', 'price': 240.35, 'volume': 200})