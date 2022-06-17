import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home, About, ErrorPage ,Login  ,  AddFood } from './pages/Index'
import { Navbar, Sidebar, Geolocation, Footer } from './components'

function App() {
 return (
  <Router>
   <Sidebar />
   <Switch>
   <Route exact path="/" component={Login} />
   <div>
   <Navbar />
    <Route exact path="/home">
     <Home />
    </Route>
    <Route path="/about">
     <About />
    </Route>
    <Route path="/AddFood">
      <AddFood/>
    </Route>

    <Route path="*">
     <ErrorPage />
    </Route>
    </div>
   </Switch>
   {/* <Footer /> */}
  </Router>
 )
}

export default App
