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
[If display2 has a previous result]:
store display2 as num1
Else:
store current display1 as num1 (parse to number)
store operator
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
[If user clicks another operator after =]:
store display2 (last result) as num1
store new operator
reset display1 to show operator (or append operator)
wait for next number input as num2
|
v
[End / Wait for next input]
