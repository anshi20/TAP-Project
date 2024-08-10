from flask import Flask, jsonify, request, redirect, flash

from repository.transaction_repository import TransactionRepository
from repository.PortfolioHoldings import PortfolioHoldings
from flask_cors import CORS
from repository.userStatisticsRepository import UserStatisticsRepository

app = Flask(__name__)
CORS(app)

@app.route('/buy',methods=['POST'])
def buy_holding():
    data = request.json
    # print(data)
    transaction_type = data["transaction_type"]
    symbol = data["symbol"]
    volume = data["volume"]
    price = data["price"]
    name = data["name"]
    result = PortfolioHoldings.buy_holding(symbol,name,volume,price)
    if result == -10:
        return jsonify({"error": "Insufficient funds"}), 200
    if result == -1:
        return jsonify({"error": "Couldn't buy holding due to DB error"}), 404
    elif not result:
        return jsonify({"error": "Couldn't buy holding due to Client Error"}), 404
    else:
        return jsonify(result.data), 200


@app.route('/sell', methods=['POST'])
def sell_holding():
    data = request.json
    volume = data["volume"]
    name=data["name"]
    current_price = data["current_price"]
    symbol = data["symbol"]
    try:
        result = PortfolioHoldings.sell_holding(symbol,name,volume,current_price)
        if result:
            return jsonify(result), 200  
        else:
            return jsonify({"message": "Holdings sold"})
    except ValueError as e:
        return jsonify(e), 400
    except Exception as e:
        return jsonify(e), 500



@app.route('/all_holdings',methods=['GET'])
def getAllHoldings():
    
    allHoldings=PortfolioHoldings.get_all_holdings()
    if allHoldings == -1:
        return jsonify({"error" : "couldn't fetch data"}),404
    else:
        return jsonify(allHoldings),200


@app.route('/all_transactions',methods=['GET'])
def getAllTransactions():
    
    allTransactions=TransactionRepository.getAllTransactions()
    if allTransactions == -1:
        return jsonify({"error" : "couldn't fetch data"}),404
    else:
        return jsonify(allTransactions),200
        

@app.route('/stock_history/<symbol>',methods=['GET'])
def getStockTransactions(symbol):
    
    stockTransactions=PortfolioHoldings.get_stock_history(symbol)
    if stockTransactions == -1:
        return jsonify({"error" : "couldn't fetch data"}),404
    else:
        return jsonify(stockTransactions),200


@app.route('/add_money/<amount>',methods=['GET'])
def addMoney(amount):
    new_money_value=UserStatisticsRepository.add_money(amount)
    if new_money_value==-1:
        return jsonify({"error":"money not added"}), 404
    else:
        return jsonify(new_money_value.data),200

@app.route('/get_money',methods=['GET'])
def getMoney():
    new_money_value=UserStatisticsRepository.get_money()
    if new_money_value==-1:
        return jsonify({"error":"money not added"}), 404
    else:
        return jsonify(new_money_value),200

@app.route('/withdraw_money/<amount>',methods=['GET'])
def withdrawMoney(amount):
    new_money_value=UserStatisticsRepository.withdraw_money(amount)
    if new_money_value==-1 :
        return jsonify({"error":"money not withdrawn"}), 404
    elif new_money_value==-2 :
        return jsonify({"error":"not sufficient funds"}), 404
    else:
        return jsonify(new_money_value.data),200


if __name__ == "__main__":
    app.run(debug=True)


