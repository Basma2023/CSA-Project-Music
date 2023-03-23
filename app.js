var albums = [
    {
      id: 1,
      artist: "The Beatles",
      album: "Abbey Road",
      genre: "Rock",
      date: "1969-09-26",
      image: "https://via.placeholder.com/350x200"
    },
    {
      id: 2,
      artist: "Prince",
      album: "Purple Rain",
      genre: "Pop",
      date: "1984-06-25",
      image: "https://via.placeholder.com/350x200"
    },
    {
      id: 3,
      artist: "Michael Jackson",
      album: "Thriller",
      genre: "Pop",
      date: "1982-11-30",
      image: "https://via.placeholder.com/350x200"
    },
    {
      id: 4,
      artist: "Led Zeppelin",
      album: "IV",
      genre: "Rock",
      date: "1971-11-08",
      image: "https://via.placeholder.com/350x200"
    },
    {
      id: 5,
      artist: "Fleetwood Mac",
      album: "Rumours",
      genre: "Rock",
      date: "1977-02-04",
      image: "https://via.placeholder.com/350x200"
    }
  ];
  
  $(document).ready(function() {
    displayAlbums(albums);
  
    $("#filterGenre").change(function() {
      var genre = $(this).val();
      if (genre == "All") {
        displayAlbums(albums);
      } else {
        var filteredAlbums = albums.filter(function(album) {
          return album.genre == genre;
        });
        displayAlbums(filteredAlbums);
      }
    });
  
    $("#addAlbumForm").submit(function(event) {
      event.preventDefault();
      var id = albums.length + 1;
      var artist = $("#addAlbumArtist").val();
      var album = $("#addAlbumName").val();
      var genre = $("#addAlbumGenre").val();
      var date = $("#addAlbumDate").val();
      var image = $("#addAlbumImage").val();
      var newAlbum = {
        id: id,
        artist: artist,
        album: album,
        genre: genre,
        date: date,
        image: image
      };
      albums.push(newAlbum);
      displayAlbums(albums);
      $("#addAlbumModal").modal("hide");
      $("#addAlbumForm")[0].reset();
    });
  
    $("#deleteAlbumConfirm").click(function() {
      var id = $("#deleteAlbumModal").data("album-id");
      var index = albums.findIndex(function(album) {
        return album.id == id;
      });
      albums.splice(index, 1);
      displayAlbums(albums);
      $("#deleteAlbumModal").modal("hide");
    });
  
    $("#albumList").on("click", ".deleteAlbumBtn", function() {
      var id = $(this).closest(".card").data("album-id");
      $("#deleteAlbumModal").data("album-id", id);
      $("#deleteAlbumModal").modal("show");
    });
    
    $("#addAlbumBtn").click(function() {
      $("#addAlbumModal").modal("show");
    });
  });
  
  function displayAlbums(albums) {
    $("#albumList").empty();
    for (var i = 0; i < albums.length; i++) {
      var albumDiv = $("<div>").addClass("col-lg-4 col-md-6 mb-4");
      var card = $("<div>").addClass("card h-100").attr("data-album-id", albums[i].id);
      var img = $("<img>").addClass("card-img-top").attr("src", albums[i].image);
      var cardBody = $("<div>").addClass("card-body");
      var artist = $("<h4>").addClass("card-title").text(albums[i].artist);
      var album = $("<h5>").text(albums[i].album);
      var genre = $("<p>").addClass("card-text").text("Genre: " + albums[i].genre);
      var date = $("<p>").addClass("card-text").text("Release Date: " + albums[i].date);
      var deleteBtn = $("<button>").addClass("btn btn-danger deleteAlbumBtn").text("Delete");
      cardBody.append(artist, album, genre, date, deleteBtn);
      card.append(img, cardBody);
      albumDiv.append(card);
      $("#albumList").append(albumDiv);
    }
  }
  