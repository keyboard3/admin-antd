import ReactDOM from 'react-dom';
import('./app').then((App: any) => {
  ReactDOM.render(<App.default />, document.getElementById("root"));
});