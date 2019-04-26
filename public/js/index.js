// Get references to page elements
var $title = $("#title");
var $image = $("#image")
var $description = $("#description");
var $example = $("#example");
var $submitBtn = $("#submit");
var $author = $("#author")
var $list = $("#list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    console.log(data);


    var memes = data.map(function ({ title, image, author, id, description, example, }) {
      var $title = $("<h1>").text(title),
        $image = $("<img>").attr("src", image),
        $author = $("<h3>").text(author),
        $description = $("<h6>").text(description),
        $word = $("<h5>").text("Example: "),
        $example = $("<h6>").text(example);


      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": id,
        })
        .append($title, $image, $author, $description, $word, $example);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });
    console.log(memes);

    $list.html(memes);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {


  event.preventDefault();

  var Meme = {
    title: $title.val().trim(),
    image: $image.val().trim(),
    description: $description.val().trim(),
    example: $example.val().trim(),
    author: $author.val().trim()

  };

  // if (!(meme.text && meme.description)) {
  //   alert("You must enter an example text and description!");
  //   return;
  // }

  API.saveExample(Meme).then(function () {
    console.log("hit")
    refreshExamples();
  });

  $example.val("");
  $description.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$list.on("click", ".delete", handleDeleteBtnClick);


