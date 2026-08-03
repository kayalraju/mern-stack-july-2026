
//****length */
// const password = "abc12345";

// if (password.length < 10) {
//     console.log("Password too short");
// }else {
//     console.log("Password is long enough");
// }


//****trim */

// const username = "   webskitters  ";
// console.log(username.trim());


//****toUpperCase */

// const username = "webskitters";
// console.log(username.toUpperCase());

/****toLowerCase */

// const username = "WEBSKITTERS";
// console.log(username.toLowerCase());


//****replace */

// const username = "webskitters";
// console.log(username.replace("webskitters","shubham"));


// const slug = "Node JS";

// console.log(slug.replace(" ", "-"));

// const text = "I like JS. JS is awesome scripting language and  JS frameworks are also good. JS is used for web development.";

// console.log(text.replaceAll("JS", "JavaScript"));

//*****slice*/

// definition  extracts a section of a string and returns it as a new string, without modifying the original string.

// const text = "I like JS. JS is awesome.";
// const part = text.slice(0, 12);
// console.log(part);


////*****split */
// const skills = "HTML,CSS,JavaScript,React";

// console.log(skills.split(",")); 


//******concat */

// const firstName = "Shubham";
// const lastName = "Kumar";

// const fullName = firstName.concat(" ", lastName);
// console.log(fullName);

// const text = "I like JS. JS is awesome.";
// console.log(text.indexOf("JS")); // 7
// console.log(text.indexOf("Python")); // -1



const slugify = (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // remove non-word, non-whitespace, non-hyphen characters
      .replace(/[\s_-]+/g, "-") // replace spaces, underscores, and hyphens with a single hyphen
      .replace(/^-+/, "") // remove leading hyphens
      .replace(/-+$/, ""); // remove trailing hyphens
  };

  console.log(slugify("Hello, World!"));