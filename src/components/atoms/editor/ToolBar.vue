<template>
  <!-- <select class="ql-align"></select> -->
  <button class="ql-align"></button>
  <button class="ql-align" value="center"></button>
  <button class="ql-align" value="right"></button>

  <button class="ql-align" value="justify"></button>
  <button class="ql-bold"></button>
  <button class="ql-italic"></button>
  <button class="ql-underline"></button>
  <!-- <button class="ql-strike"></button> -->
  <!-- Add font size dropdown -->
  <select class="ql-size">
    <option value="small"></option>
    <!-- Note a missing, thus falsy value, is used to reset to default -->
    <option selected></option>
    <option value="large"></option>
    <option value="huge"></option>
  </select>
  <!-- Add a bold button -->
  <button class="ql-bold"></button>
  <!-- Add subscript and superscript buttons -->
  <button class="ql-script" value="sub"></button>
  <button class="ql-script" value="super"></button>
  <!-- But you can also add your own -->
  <!-- <button id="custom-button">tes</button> -->
</template>
