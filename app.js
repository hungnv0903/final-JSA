function getData(url, cb) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        cb(undefined, JSON.parse(xhr.responseText));
      } else {
        cb(new Error(xhr.statusText));
      }
    }
  };

  xhr.open('GET', url, true);
  xhr.send();
}

const USERS = 'https://jsonplaceholder.typicode.com/users';
const ALBUMS = 'https://jsonplaceholder.typicode.com/albums';
const PHOTOS = 'https://jsonplaceholder.typicode.com/photos';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChooseUser = this.handleChooseUser.bind(this);
    this.state = { users: [], albums: [] };
  }

  componentDidMount() {
    // Problem 01
    // YOUR CODE HERE
    getData(USERS, (error, userData) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log(userData);
      this.setState({ users: userData });
    })
  }

  async handleChooseUser(event) {
    var userId = event.target.value;

    // Problem02
    // YOUR CODE HERE

    getData(`${ALBUMS}?userId=${userId}`, (error, albumByUser) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(albumByUser);
      this.setState({ albums: albumByUser });
      albumByUser.forEach((album) => {
        getData(`${PHOTOS}?albumId=${album.id}`, (error, photoData) => {
          if (error) {
            console.error(error);
            return ; 
          }
          console.log(photoData);
          album.photos = photoData;
          this.setState({ albums: albumByUser });
        });
      });
    });
  }

  renderAlbums() {
    const { albums } = this.state;

    if (!albums) {
      return <h1>Loading albums...</h1>;
    }

    return albums.map(function (album, index) {
      return (
        <div key={'album' + index} className="row">
          <h4 className="col-12 pt-4">Album {album.id}</h4>
          {album.photos ? (
            album.photos.map(function (photo, index) {
              return (
                <div
                  key={'photo' + index}
                  className="card col-3 pt-2"
                  style={{ width: '18rem;' }}
                >
                  <img
                    class="card-img-top"
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                  />
                  <div class="card-body">
                    <p class="card-text">
                      <strong>Photo {photo.id}:</strong> {photo.title}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <h2>Loading photos...</h2>
          )}
        </div>
      );
    });
  }

  render() {
    if (!this.state.users) {
      return <h1>Loading...</h1>;
    }

    return (
      <div className="container-fluid">
        <h1>Photo Galery</h1>
        <select class="custom-select" onChange={this.handleChooseUser}>
          <option selected>Choose user...</option>
          {this.state.users.map((user, index) => {
            return (
              <option key={'option' + index} value={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>
        <div className="albums-wrapper">{this.renderAlbums()}</div>
      </div>
    );
  }
}

ReactDOM.render(
  React.createElement('div' , undefined) , [
    React.createElement('h1' , undefined , "Huyen"),
    React.createElement('h1' , undefined , "Thuyet"),
    React.createElement('h1' , undefined , "Nam")
  ]
);
// ReactDOM.render(<App />, document.querySelector('#root'));
