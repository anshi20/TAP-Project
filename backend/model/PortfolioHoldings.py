class PortfolioHoldings:

    def __init__(self, symbol, quantity, avg_cost):
        self.__symbol = symbol
        self.__quantity = quantity
        self.__avg_cost = avg_cost

    @property
    def symbol(self):
        return self.__symbol

    @property
    def quantity(self):
        return self.__quantity

    @property
    def avg_cost(self):
        return self.__avg_cost

    @symbol.setter
    def symbol(self, value):
        self.__symbol = value

    @quantity.setter
    def quantity(self, value):
        self.__quantity = value

    @avg_cost.setter
    def avg_cost(self, value):
        self.__avg_cost = value

    def __str__(self):
        return (f"*** Holding Details are ---> symbol {self.__symbol}, "
                f"quantity {self.__quantity}, average cost {self.__avg_cost}")

    # Converting object to dictionary
    def to_dict(self):
        return {
            "symbol": self.__symbol,
            "quantity": self.__quantity,
            "avg_cost": self.__avg_cost
        }

    # Convert JSON to our object
    @staticmethod
    def to_object(data):
        return Stocks(data["symbol"], data["quantity"], data["avg_cost"])


if __name__ == '__main__':
    h1 = Stocks("AAPL", 100, 145.30)
    print(h1.__str__())