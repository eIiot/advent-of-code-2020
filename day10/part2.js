var input = `105
78
37
153
10
175
62
163
87
22
24
92
46
5
115
61
124
128
8
60
17
93
166
29
90
148
113
55
141
134
79
101
49
133
38
53
33
30
66
159
23
132
145
147
121
94
146
21
135
56
176
118
44
138
85
169
111
9
1
83
36
59
140
149
160
43
131
69
2
25
84
39
28
171
172
100
18
15
114
70
86
97
155
152
40
122
77
16
11
170
52
45
139
76
102
63
54
142
14
158
80
154
112
91
108
73
127
123`;

var testInput = `16
10
15
5
1
11
7
19
6
12
4`;

var testInput2 = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`

var testInput3 = `1
2
3
4
5
8
9
10`

// input = testInput2;

adapters = input.split('\n').map(function(x) {return(parseInt(x,10))}).sort(function(a, b) {return a - b});

adapters.push(adapters[adapters.length-1]+3);
adapters.unshift(0);

var lastThreeJump = 0;

const splitAdapters = [[adapters[0]]];

let last = adapters[0];

for (const item of adapters.slice(1)) {
  if (item - last > 2) splitAdapters.push([]);
  splitAdapters[splitAdapters.length - 1].push(item);
  last = item;
};

// compute # of possibilites in splitAdapters

let groupValues = [];

// array for determening values

var specialArray = [0,1,2,4];

var arrayLength = 100;

for (let i = 4; i < arrayLength; i++) {
  specialArray.push(specialArray[i-3]+specialArray[i-2]+specialArray[i-1]);
};

for (let i = 0; i < splitAdapters.length; i++) {
  const adapterGroup = splitAdapters[i];

  // filter out important groups

  if (adapterGroup.length > 1) {
    groupValues.push(specialArray[adapterGroup.length-1]);
  };
};

console.log(adapters);
console.log(splitAdapters);
console.log(groupValues);

console.log(groupValues.reduce((a, b)=> a*b, 1));

debugger;