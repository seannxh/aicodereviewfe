# buggy_calculator.py

def divide(a, b):
    return a / b  # no zero division check

def get_user_input():
    age = input("Enter age: ")
    return age + 10  # TypeError: can't add str + int

def find_user(users, name):
    for i in range(len(users) + 1):  # off-by-one error
        if users[i]["name"] == name:
            return users[i]

def save_password(password):
    with open("passwords.txt", "w") as f:  # storing plain text passwords
        f.write(password)

class BankAccount:
    balance = 0  # class variable shared across ALL instances (bug)
    
    def withdraw(self, amount):
        self.balance -= amount  # no check if balance goes negative