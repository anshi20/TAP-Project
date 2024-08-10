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




if __name__ == "__main__":
    UserStatisticsRepository.withdraw_money(20)
