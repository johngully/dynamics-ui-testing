# dynamics-ui-testing
Jest + Selenium testing of Microsoft Dynamics

## Getting started
Create the `environmentData.json` configuration file.  It should contain JSON specifying the username and password for the Dynamics account.
```
{
  "username": "username@example.com",
  "password": "password-goes-here"
}
```

Then install the application dependencies, and execute the tests.
```bash
npm install
npm test
```