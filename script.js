var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var array = [];
document.addEventListener('DOMContentLoaded', function () {
    var sorts = document.querySelectorAll('.link');
    sorts.forEach(function (sort) {
        sort.addEventListener('click', function (e) {
            localStorage.setItem('sort', e.target.textContent);
            window.location.href = "canvas.html";
        });
    });
});
var generateArray = function () {
    var _a;
    var numbers = [];
    for (var i = 1; i <= 100; i++)
        numbers.push(i);
    for (var i = numbers.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [numbers[j], numbers[i]], numbers[i] = _a[0], numbers[j] = _a[1];
    }
    return numbers;
};
var renderArray = function () {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, canvas.width, canvas.height);
    var barWidth = 5;
    var barSpacing = 2;
    var maxHeight = canvas.height - 20;
    var maxValue = Math.max.apply(Math, array);
    var totalWidth = (barWidth + barSpacing) * array.length;
    var startX = (canvas.width - totalWidth) / 2;
    for (var i = 0; i < array.length; i++) {
        var barHeight = (array[i] / maxValue) * maxHeight;
        var x = startX + i * (barWidth + barSpacing);
        var y = canvas.height - barHeight;
        ctx === null || ctx === void 0 ? void 0 : ctx.fillRect(x, y, barWidth, barHeight);
    }
};
var delay = function (delay) {
    return new Promise(function (resolve) { return setTimeout(resolve, delay); });
};
var bubbleSort = function (arr) { return __awaiter(_this, void 0, void 0, function () {
    var n, i, j;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                n = arr.length;
                i = 0;
                _b.label = 1;
            case 1:
                if (!(i < n - 1)) return [3 /*break*/, 6];
                j = 0;
                _b.label = 2;
            case 2:
                if (!(j < n - i - 1)) return [3 /*break*/, 5];
                if (!(arr[j] > arr[j + 1])) return [3 /*break*/, 4];
                // Swap arr[j] and arr[j+1]
                _a = [arr[j + 1], arr[j]], arr[j] = _a[0], arr[j + 1] = _a[1];
                array = arr;
                renderArray();
                return [4 /*yield*/, delay(1)];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                j++;
                return [3 /*break*/, 2];
            case 5:
                i++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/, arr];
        }
    });
}); };
var selectionSort = function (arr) { return __awaiter(_this, void 0, void 0, function () {
    var n, i, minIndex, j;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                n = arr.length;
                i = 0;
                _b.label = 1;
            case 1:
                if (!(i < n - 1)) return [3 /*break*/, 4];
                minIndex = i;
                // Find the index of the minimum element in the unsorted part of the array
                for (j = i + 1; j < n; j++) {
                    if (arr[j] < arr[minIndex]) {
                        minIndex = j;
                    }
                }
                if (!(minIndex !== i)) return [3 /*break*/, 3];
                _a = [arr[minIndex], arr[i]], arr[i] = _a[0], arr[minIndex] = _a[1];
                array = arr;
                renderArray();
                return [4 /*yield*/, delay(1)];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); };
array = generateArray();
window[localStorage.getItem('sort')](array);
