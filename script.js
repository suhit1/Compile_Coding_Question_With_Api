// Taking Reference From Variables

let lang = document.getElementById("lang");
let compiler = document.getElementById("compiler");
let output_result = document.getElementById("output_result");
let compile_btn = document.getElementById("compile_btn");

compile_btn.addEventListener("click", function () {
  output_result.innerText = "";

  let compiler_code = compiler.value;

  let request_post = new XMLHttpRequest();

  request_post.addEventListener("load", function (event) {
    let post_data;
    post_data = JSON.parse(event.target.responseText);

    console.log(post_data);

    if ("error" in post_data) {
      console.log("error");
    }
    if ("codeId" in post_data) {
      let request_get = new XMLHttpRequest();

      request_get.addEventListener("load", function (event) {
        let get_data = JSON.parse(event.target.responseText);

        let data = JSON.parse(get_data.data);

        console.log(data);

        if (data.output) {
          output_result.innerText = "";
          output_result.innerText = data.output;
          clearInterval(timer);
        }
        if (data.errors) {
          output_result.innerText = "";
          output_result.innerText = data.errors;
          clearInterval(timer);
        }
      });

      let timer = setInterval(function () {
        request_get.open(
          "GET",
          ` https://codequotient.com/api/codeResult/${post_data.codeId}`
        );

        request_get.send();
      }, 5000);
    }
  });

  var res_data = {
    code: `${compiler_code}`,
  };

  if (lang.value === "python") {
    res_data.langId = "0";
  }
  if (lang.value === "javascript") {
    res_data.langId = 4;
  }
  if (lang.value === "c") {
    res_data.langId = 7;
  }
  if (lang.value === "cpp") {
    res_data.langId = 77;
  }
  if (lang.value === "java") {
    res_data.langId = 8;
  }

  request_post.open("POST", "https://codequotient.com/api/executeCode");

  request_post.setRequestHeader("Content-Type", "application/json");

  request_post.send(JSON.stringify(res_data));

  console.log(res_data);
});
