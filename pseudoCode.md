[Start]
|
v
[User clicks Number buttons]
|
v
[Append digits to display1]
[Update display1 element]
|
v
[User clicks Operator button (+, -, *, /)]
|
v
[Store current display1 as num1 (parse to number)]
[Store operator]
[Append operator to display1 string]
[Update display1 element]
|
v
[User clicks Number buttons]
|
v
[Append digits to display1 string]
[Update display1 element]
|
v
[User clicks = button]
|
v
[Extract num2 from display1 after operator]
[Call operate(operator, num1, num2)]
[Update display2 element with result]
|
v
[End / Wait for next input]
