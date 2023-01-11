var formula = ""
var display = ""
var ans = 0

const operatorguys = ["+", "-", "*", '/', "(", ")", "^", "√", "!"]
var operant = []
var operator = []
var stack = []
// button function setting

function inputToFormula() {
    if (formula == $("#main_display").val() || display == $("#main_display").val()) {
        console.log("Need to translate.")
        return
    }
    var inputVal = $("#main_display").val().split("")
    var inputVal_display = $("#main_display").val().split("")
    console.log(inputVal)
    for (let i = 0; i < inputVal.length; i++) {
        if (operatorguys.includes(inputVal[i])) {
            console.log("Operatorguys contained.")
            inputVal.splice(i + 1, 0, " ")
            inputVal.splice(i, 0, " ")
            inputVal_display.splice(i + 1, 0, " ")
            inputVal_display.splice(i, 0, " ")
            console.log(inputVal)
            switch (inputVal_display[i]) {
                case operatorguys.at(2):
                    inputVal_display[i] = "×"
                    break;

                case operatorguys.at(3):
                    inputVal_display[i] = "÷"
                    break;
            }
            i += 2
        }
    }

    formula = inputVal.join("")
    display = inputVal_display.join("")
    console.log(display)
}

$(".key").on("click", function () {
    switch ($(this).attr("id")) {
        case "zero":
            formula += "0"
            display += "0"
            break
        case "one":
            formula += "1"
            display += "1"
            break
        case "two":
            formula += "2"
            display += "2"
            break
        case "three":
            formula += "3"
            display += "3"
            break
        case "four":
            formula += "4"
            display += "4"
            break
        case "five":
            formula += "5"
            display += "5"
            break
        case "six":
            formula += "6"
            display += "6"
            break
        case "seven":
            formula += "7"
            display += "7"
            break
        case "eight":
            formula += "8"
            display += "8"
            break
        case "nine":
            formula += "9"
            display += "9"
            break;

        case "plus":
            formula += " + "
            display += " + "
            break
        case "minus":
            formula += " - "
            display += " - "
            break
        case "multiply":
            formula += " * "
            display += " × "
            break
        case "divide":
            formula += " / "
            display += " ÷ "
            break

        case "point":
            formula += "."
            display += "."
            break
        case "left_brac":
            formula += " ( "
            display += "("
            break
        case "right_brac":
            formula += " ) "
            display += ")"
            break
        case "root":
            formula += "√ ( "
            display += "√("
            break
        case "power":
            formula += " ^ "
            display += " ^ "
            break
        case "pi":
            formula += "π"
            display += "π"
            break
        case "percent":
            formula += " / 100"
            display += "%"
            break
        case "factorial":
            formula += " !"
            display += "!"
            break
        case "ans":
            if (ans == "") {
                break
            }
            formula += "Ans"
            display += "Ans"
            break
        case "allClear":
            if (ans != "") {
                $("#sub_display").text("Ans = " + ans)
            }
            $("#main_display").val(0)
            formula = ""
            display = ""
            console.log("allClear")

            break

        case "equal":
            if ($("#main_display").val() == "") {
                break
            }

            inputToFormula()
            $("#sub_display").text(display + " =")
            main()
            $("#main_display").val(ans)
    }

    if ($(this).attr("id") != "equal") {
        $("#main_display").val(display)
    }
})


// main mechanics

function priority(x) {
    if (x == "+" || (x == "-")) {
        return 1
    }
    if (x == "*" || x == "/" || x == "!" || x == "%") {
        return 2
    }
    if (x == "^" || x == "√") {
        return 3
    }
    return 4
}

function compare(a, b) {
    a = priority(a)
    b = priority(b)
    if (a <= b) {
        return true
    }
    return false
}

function main() {
    formula = formula.split(" ")
    for (let i = 0; i < formula.length; i++) {
        if (formula[i] == "" || formula[i] == " ") {
            console.log(formula[i])
            formula.splice(i, 1)
            i--
        }
    }
    console.log(formula)

    while (formula.length != 0) {

        console.log(formula[0] + " is being sorted.")

        if (!(operatorguys.includes(formula[0]))) {
            operant.push(formula.shift(0))
            console.log(operant)
        } else {
            operator.push(formula.shift(0))
            console.log(operator)
            if (operator.length < 2) {
                console.log("operator is not long enough.")
                continue
            }
            while (compare(operator.at(-1), operator.at(-2))) {
                if (operator.at(-2) == "(" || operator.length < 2) {
                    break
                }
                operant.push(operator.at(-2))
                operator.splice(-2, 1)
            }
            while (operator.at(-1) == ")") {
                if (operator.at(-2) == "(") {
                    operator.pop()
                    operator.pop()
                    break
                }
                console.log("remove the last sec item")
                operant.push(operator.at(-2))
                operator.splice(-2, 1)
            }
        }
    }

    while (operator.length != 0) {
        operant.push(operator.pop())
    }

    console.log(operant)

    while (operant.length != 0) {
        console.log(0)
        if (!(operatorguys.includes(operant[0]))) {
            if (operant[0] == "π") {
                stack.push(Math.PI)
                operant.shift()
            } else if (operant[0] == "Ans") {
                stack.push(ans)
                operant.shift()
            } else {
                stack.push(operant.shift())
            }
        } else {
            var temp = 1
            if (operant[0] == "+") {
                temp = Number(stack.at(-2)) + Number(stack.at(-1))
                stack.pop()
                stack.pop()
            }
            if (operant[0] == "-") {
                temp = Number(stack.at(-2)) - Number(stack.at(-1))
                stack.pop()
                stack.pop()
            }
            if (operant[0] == "*") {
                temp = Number(stack.at(-2)) * Number(stack.at(-1))
                stack.pop()
                stack.pop()
            }
            if (operant[0] == "/") {
                temp = Number(stack.at(-2)) / Number(stack.at(-1))
                stack.pop()
                stack.pop()
            }
            if (operant[0] == "^") {
                temp = Math.pow(Number(stack.at(-2)), Number(stack.at(-1)))
                stack.pop()
                stack.pop()
            }
            if (operant[0] == "√") {
                temp = Math.sqrt(Number(stack.at(-1)))
                stack.pop()
            }
            if (operant[0] == "!") {
                var num = Number(stack.pop())
                console.log(num)
                while (num > 1) {
                    temp *= num
                    num--
                }
            }
            operant.shift()
            stack.push(temp)
        }
    }


    console.log("The answer is: " + stack[0])
    ans = stack[0]

    $(".addHistory").append('<div class="history"><p class= "question">' + display + ' =' + '</p ><p class="answer">' + ans + '</p></div>')

    formula = ""
    display = ""
    operant = []
    operator = []
    stack = []
}






