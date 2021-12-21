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

input = testInput;

adapters = input.split('\n').map(function(x) {return(parseInt(x,10))}).sort(function(a, b) {return a - b});

adapters.push(adapters[adapters.length-1]+3)

var previousAdapter = 0;

var oneJumps = 0;
var threeJumps = 0;

for (let i = 0; i < adapters.length; i++) {
  const adapter = adapters[i];
  
  if (adapter-previousAdapter === 1) {
    oneJumps++;
  };

  if (adapter-previousAdapter === 3) {
    threeJumps++;
  };

  previousAdapter = adapter;
};

console.log({oneJumps,threeJumps})

console.log(oneJumps*threeJumps)

debugger;