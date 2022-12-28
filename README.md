# employee-org-app

## Development guideline
```
tsc index.ts
node index.js
```
## Test-Case

### Add employee
```
const ceo: Employee = {
    uniqueId: 1,
    name: 'Mark Zuckerberg',
    subordinates: [],
}
const orgApp = new EmployeeOrgApp(ceo);
const Sarah_Donald = orgApp.add("Sarah Donald", ceo.uniqueId);
const Cassandra_Reynolds = orgApp.add("Cassandra Reynolds", Sarah_Donald.uniqueId);
const Mary_Blue = orgApp.add("Mary Blue", Cassandra_Reynolds.uniqueId);
const Bob_Saget = orgApp.add("Bob Saget", Cassandra_Reynolds.uniqueId);
const Tina_Teff = orgApp.add("Tina Teff", Bob_Saget.uniqueId);
const Will_Turner = orgApp.add("Will Turner", Bob_Saget.uniqueId);
const Tyler_Simpson = orgApp.add("Tyler Simpson", ceo.uniqueId);
const Harry_Tobs = orgApp.add("Harry Tobs", Tyler_Simpson.uniqueId);
const Thomas_Brown = orgApp.add("Thomas Brown", Harry_Tobs.uniqueId);
const George_Carrey = orgApp.add("George Carrey", Tyler_Simpson.uniqueId);
const Gary_Styles = orgApp.add("Gary Styles", Tyler_Simpson.uniqueId);
const Bruce_Willis = orgApp.add("Bruce Willis", ceo.uniqueId);
const Georgina_Flangy = orgApp.add("Georgina Flangy", ceo.uniqueId);
const Sophie_Turner = orgApp.add("Sophie Turner", Georgina_Flangy.uniqueId);
console.log(JSON.stringify(ceo));
```
### Output
```
{
  "uniqueId": 1,
  "name": "Mark Zuckerberg",
  "subordinates": [
    {
      "uniqueId": 2,
      "name": "Sarah Donald",
      "subordinates": [
        {
          "uniqueId": 3,
          "name": "Cassandra Reynolds",
          "subordinates": [
            { "uniqueId": 4, "name": "Mary Blue", "subordinates": [] },
            {
              "uniqueId": 5,
              "name": "Bob Saget",
              "subordinates": [
                { "uniqueId": 6, "name": "Tina Teff", "subordinates": [] },
                { "uniqueId": 7, "name": "Will Turner", "subordinates": [] }
              ]
            }
          ]
        }
      ]
    },
    {
      "uniqueId": 8,
      "name": "Tyler Simpson",
      "subordinates": [
        {
          "uniqueId": 9,
          "name": "Harry Tobs",
          "subordinates": [
            { "uniqueId": 10, "name": "Thomas Brown", "subordinates": [] }
          ]
        },
        { "uniqueId": 11, "name": "George Carrey", "subordinates": [] },
        { "uniqueId": 12, "name": "Gary Styles", "subordinates": [] }
      ]
    },
    { "uniqueId": 13, "name": "Bruce Willis", "subordinates": [] },
    {
      "uniqueId": 14,
      "name": "Georgina Flangy",
      "subordinates": [
        { "uniqueId": 15, "name": "Sophie Turner", "subordinates": [] }
      ]
    }
  ]
}
```

### Move employee
```
orgApp.move(Bob_Saget.uniqueId, Georgina_Flangy.uniqueId);
console.log(JSON.stringify(ceo));
```
### Output
```
{
  "uniqueId": 1,
  "name": "Mark Zuckerberg",
  "subordinates": [
    {
      "uniqueId": 2,
      "name": "Sarah Donald",
      "subordinates": [
        {
          "uniqueId": 3,
          "name": "Cassandra Reynolds",
          "subordinates": [
            { "uniqueId": 4, "name": "Mary Blue", "subordinates": [] },
            { "uniqueId": 6, "name": "Tina Teff", "subordinates": [] },
            { "uniqueId": 7, "name": "Will Turner", "subordinates": [] }
          ]
        }
      ]
    },
    {
      "uniqueId": 8,
      "name": "Tyler Simpson",
      "subordinates": [
        {
          "uniqueId": 9,
          "name": "Harry Tobs",
          "subordinates": [
            { "uniqueId": 10, "name": "Thomas Brown", "subordinates": [] }
          ]
        },
        { "uniqueId": 11, "name": "George Carrey", "subordinates": [] },
        { "uniqueId": 12, "name": "Gary Styles", "subordinates": [] }
      ]
    },
    { "uniqueId": 13, "name": "Bruce Willis", "subordinates": [] },
    {
      "uniqueId": 14,
      "name": "Georgina Flangy",
      "subordinates": [
        { "uniqueId": 15, "name": "Sophie Turner", "subordinates": [] },
        { "uniqueId": 5, "name": "Bob Saget", "subordinates": [] }
      ]
    }
  ]
}

```

### Undo action
```
orgApp.undo();
console.log(JSON.stringify(ceo));
```
### Output
```
{
  "uniqueId": 1,
  "name": "Mark Zuckerberg",
  "subordinates": [
    {
      "uniqueId": 2,
      "name": "Sarah Donald",
      "subordinates": [
        {
          "uniqueId": 3,
          "name": "Cassandra Reynolds",
          "subordinates": [
            { "uniqueId": 4, "name": "Mary Blue", "subordinates": [] },
            {
              "uniqueId": 5,
              "name": "Bob Saget",
              "subordinates": [
                { "uniqueId": 6, "name": "Tina Teff", "subordinates": [] },
                { "uniqueId": 7, "name": "Will Turner", "subordinates": [] }
              ]
            }
          ]
        }
      ]
    },
    {
      "uniqueId": 8,
      "name": "Tyler Simpson",
      "subordinates": [
        {
          "uniqueId": 9,
          "name": "Harry Tobs",
          "subordinates": [
            { "uniqueId": 10, "name": "Thomas Brown", "subordinates": [] }
          ]
        },
        { "uniqueId": 11, "name": "George Carrey", "subordinates": [] },
        { "uniqueId": 12, "name": "Gary Styles", "subordinates": [] }
      ]
    },
    { "uniqueId": 13, "name": "Bruce Willis", "subordinates": [] },
    {
      "uniqueId": 14,
      "name": "Georgina Flangy",
      "subordinates": [
        { "uniqueId": 15, "name": "Sophie Turner", "subordinates": [] }
      ]
    }
  ]
}
```

### Redo action
```
orgApp.redo();
console.log(JSON.stringify(ceo));
```
### Output
```
{
  "uniqueId": 1,
  "name": "Mark Zuckerberg",
  "subordinates": [
    {
      "uniqueId": 2,
      "name": "Sarah Donald",
      "subordinates": [
        {
          "uniqueId": 3,
          "name": "Cassandra Reynolds",
          "subordinates": [
            { "uniqueId": 4, "name": "Mary Blue", "subordinates": [] },
            { "uniqueId": 6, "name": "Tina Teff", "subordinates": [] },
            { "uniqueId": 7, "name": "Will Turner", "subordinates": [] }
          ]
        }
      ]
    },
    {
      "uniqueId": 8,
      "name": "Tyler Simpson",
      "subordinates": [
        {
          "uniqueId": 9,
          "name": "Harry Tobs",
          "subordinates": [
            { "uniqueId": 10, "name": "Thomas Brown", "subordinates": [] }
          ]
        },
        { "uniqueId": 11, "name": "George Carrey", "subordinates": [] },
        { "uniqueId": 12, "name": "Gary Styles", "subordinates": [] }
      ]
    },
    { "uniqueId": 13, "name": "Bruce Willis", "subordinates": [] },
    {
      "uniqueId": 14,
      "name": "Georgina Flangy",
      "subordinates": [
        { "uniqueId": 15, "name": "Sophie Turner", "subordinates": [] },
        { "uniqueId": 5, "name": "Bob Saget", "subordinates": [] }
      ]
    }
  ]
}
```
