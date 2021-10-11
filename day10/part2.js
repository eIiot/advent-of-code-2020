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

console.log('starting, this may take a while')

adapters = input.split('\n').map(function(x) {return(parseInt(x,10))}).sort(function(a, b) {return a - b});

adapters.push(adapters[adapters.length-1]+3);
adapters.unshift(0);

var stepsList = [[0]];

var acceptedJumpValues = [1,2,3];

for (let i = 0; i < adapters.length; i++) {
  var numberOfJumps = 0;

  const adapter = adapters[i];
  const nextAdapter = adapters[i+1];
  const nextAdapter2 = adapters[i+2];
  const nextAdapter3 = adapters[i+3];

  const newAdapter = [adapter,[]];
  
  if (acceptedJumpValues.includes(nextAdapter - adapter)) {
    newAdapter[1].push(nextAdapter);
  };

  if (acceptedJumpValues.includes(nextAdapter2 - adapter)) {
    newAdapter[1].push(nextAdapter2);
  };

  if (acceptedJumpValues.includes(nextAdapter3 - adapter)) {
    newAdapter[1].push(nextAdapter3);
  };

  adapters[i] = newAdapter;
};

for (let i = 0; i < adapters.length; i++) {
  const adapter = adapters[i][0];
  const nextValues = adapters[i][1];

  for (let j = 0; j < stepsList.length; j++) {
    const steps = stepsList[j];
    
    if (steps[steps.length-1] === adapter) {

      // add arrays with each next step
      for (let k = 0; k < nextValues.length; k++) {
        const nextValue = nextValues[k];

        const newArray = steps.slice();

        newArray.push(nextValue);
        
        stepsList.push(newArray);

        // console log legnth of stepsList if it is a multiple of 1000
        if (stepsList.length % 100000 === 0) {
          console.log(stepsList.length);
        };
      };
    };
  };
};

// remove all stepsList items without a value of 22;

stepsList = stepsList.filter(item => item[item.length-1] == adapters[adapters.length-1][0]);

console.log(adapters);

console.log(stepsList);

debugger;