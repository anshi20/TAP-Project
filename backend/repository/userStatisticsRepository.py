from mysql.connector import Error

from repository.database_access import get_db_connection

class UserStatisticsRepository:

    @staticmethod
    def add_money(amount):

         try:
             conn = get_db_connection()
             current_money=conn.table('userstatistics').select("*").execute()
            #  print(current_money)
             total_money=current_money.data[0]["money"]+float(amount)
             add_transaction = conn.table('userstatistics').update({'money':total_money}).eq('user_id',1).execute()
            #  print(add_transaction)
             return add_transaction
         except Error as e:
             return -1


    @staticmethod
    def withdraw_money(amount):

         try:
            
             conn = get_db_connection()
             current_money=conn.table('userstatistics').select("*").execute().data[0]["money"]
             if float(amount)>current_money:
                return -2
             total_money=current_money-float(amount)
             
             add_transaction = conn.table('userstatistics').update({'money':total_money}).eq('user_id',1).execute()
             return add_transaction
         except Error as e:
             return -1

    @staticmethod
    def get_money():

         try:
             conn = get_db_connection()
             current_money=conn.table('userstatistics').select("*").execute().data[0]["money"]
            #  print(add_transaction)
             return current_money
         except Error as e:
             return -1

    @staticmethod
    def get_invested_amount():

         try:
             conn = get_db_connection()
             data = conn.table('portfolioholdings').select("avg_cost", "volume").execute()
             total_investment = sum(row['avg_cost'] * row['volume'] for row in data.data)
             print("Total Investment:", total_investment)
    
             return total_investment
         except Error as e:
             return -1




if __name__ == "__main__":
    UserStatisticsRepository.get_invested_amount()
