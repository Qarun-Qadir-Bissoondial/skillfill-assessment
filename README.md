# SkillfillAssessment

This project is a technical assessment by Skillfill. The goal of this application is a basic multiple-choice Quiz interface.

## How to set up dev environment and launch platform

1. Clone the repo
2. Obtain `p_key.json` and place in the root of the backend folder
3. Run `npm install` from the root of the code repo
4. Run `go get` from the root of the backend folder
5. Run `go run main.go` from the root of the backend folder
6. Run `npm run start` from the root of the code repo
7. Navigate to localhost:4200 to start the application

## Assumptions

### Back-end

- The backend handles heavy request loads
- The backend is always authenticated when accessing Firebas

### Front-end

- The user does not re-do the same quiz that was already done
- The user does not manually enter any bad IDs into the URL search bar

## Bonus Features

- External Database: Firebase Realtime Database
- Authentication: Firebase Authentication with guarded routes
- Time limit: The quiz automatically exits when the timer runs out
