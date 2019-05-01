// Get references to page elements
var $title = $("#title");
var $image = $("#image")
var $description = $("#description");
var $example = $("#example");
var $submitBtn = $("#submit");
var $author = $("#author")
var $list = $("#list");
var $like = $("#like");
var $dislike = $("#dislike");




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
  },
  addLike: function (id) {
    return $.ajax({
      url: `memes/${id}/likes/increment`,
      type: "GET"
    });
  },
  addDislike: function (id) {
    return $.ajax({
      url: `/memes/${id}/dislikes/increment`,
      type: "GET"
    })
  }


};





// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    console.log(data);



    var memes = data.map(function ({ title, image, author, id, description, example, }) {
      var $title = $("<h1>").text(title),
        $image = $("<img>").attr("src", image),
        $wordOne = $("<h5>").text("Author: "),
        $author = $("<h6>").html(author),
        $wordTwo = $("<h5>").text("Description: "),
        $description = $("<h6>").text(description),
        $wordThree = $("<h5>").text("Example: "),
        $example = $("<h6>").text(example);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": id,
        })
        .append($image, $title, $wordOne, $author, $wordTwo, $description, $wordThree, $example);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.prepend($button);

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



$(".likes").one("click", function (event, id) {
  event.preventDefault();
  var id = $(this)
    .parent().parent()
    .attr("data-id");

  console.log(id);

  API.addLike(id).then(({ likesNum }) => {
    console.dir($(`#count-${id}`));
    console.log(likesNum);
    return $(`#count-${id}`).text(`${likesNum}`);
  }).catch(err => {
    console.error(err);
  })

});

$(".dislike").one("click", function (event, id) {
  event.preventDefault();
  var id = $(this)
    .parent().parent()
    .attr("data-id");

  console.log(id);

  API.addDislike(id).then(({ dislikesNum }) => {
    console.dir($(`#count-${id}`));
    console.log(dislikesNum);
    return $(`#counts-${id}`).text(`${dislikesNum}`);
  }).catch(err => {
    console.error(err);
  })

});
$(document).ready(function () {


  //smooth scrolling
  $("a[href='#top']").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1000);
    return false;
  });

});




// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$list.on("click", ".delete", handleDeleteBtnClick);



