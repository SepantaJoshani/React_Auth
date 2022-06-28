import { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`
  
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    font-family: 'Nunito', sans-serif;
    font-size: 22px;
    color: #fff;
}

body {
    min-height: 100vh;
    background-color: dodgerblue;
}

input[type="text"],
input[type="password"],
button,
textarea {
  font-family: 'Nunito', sans-serif;
  font-size: 22px;
  padding: 0.25rem;
  border-radius: 0.5rem;
}

label,
button {
  margin-top: 1rem;
}

button {
  padding: 0.5rem;
}

.hide {
    display: none;
}

.valid {
    color: limegreen;
    margin-left: 0.25rem;
}

.invalid {
    color: red;
    margin-left: 0.25rem;
}
.flexGrow {
    flex-grow: 1;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
}





`;
