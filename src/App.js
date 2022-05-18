import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './app.css'

class App extends React.Component {
  /**
   * DATAS
   */
  constructor(props) {
    super(props)

    this.input = React.createRef()
  
    this.state = {
       newWho: '',
       newWat: '',
       characters: []
    }
  }

  /**
   * MOUNTED
   */
  componentDidMount = () => {
      console.log('my ass is mounted');
      fetch('http://myjson.dit.upm.es/api/bins/fe7z')
          .then(res => res.json())
          .then(json => this.setState({characters: json}))
  }

  /**
   * METHODS
   */
  listOfDudes = () => {
      return this.state.characters.map(dude => (
        <CSSTransition key={dude.id} timeout={200} classNames="dude">
          <li className="dude">

              <a href className="remove" onClick={() => this.removeDude(dude)}>x</a>

              <article className={dude.cool < 10 ? 'faded' : dude.cool > 20 ? 'gold' : ''}>
                  {dude.who}

                  {dude.who.length < 3 && (
                      <small>
                          <strong> - lol, short name</strong>    
                      </small>
                  )}
                  <span>{dude.wat}</span>
              </article>

              <input type="number" value={dude.cool} onChange={this.handleCool(dude)} />
          </li>
        </CSSTransition>
      ))
  }

  handleWho = event => {
      this.setState({
          newWho: event.target.value
      })
  }

  handleWat = event => {
      this.setState({
          newWat: event.target.value
      })
  }

  handleCool = dude => event => {
      const cool = +event.target.value

      this.setState(state => {
          return { 
              characters: state.characters.map(item => 
                  item === dude ? {...dude, cool} : item
              )
          };
      });
  }

  removeDude = dude => {
      this.setState(state => {
          return { 
              characters: state.characters.filter(item => item !== dude)};
      });
  }

  handleSubmit = event => {
      if (event.key === 'Enter' && this.state.newWho && this.state.newWat) {
          this.setState(state => {
              const newDude = {
                  id: Math.max(...state.characters.map(dude => dude.id)) + 1,
                  who: this.state.newWho,
                  wat: this.state.newWat,
                  cool: 10
              }
  
              return { 
                  characters: [...state.characters, newDude] 
              };
          });
          this.resetForm()
      }
  }

  resetForm = () => {
      this.setState({
          newWho: '',
          newWat: ''
      })
      
      this.input.current.focus()
  }

  /**
   * TEMPLATE
   */
  render() {
    return (
      <section>
        <h1>Hello dudes send me nudes</h1>
          <div>
            <TransitionGroup component="ul">
              {this.listOfDudes()}
            </TransitionGroup>

              <form className="add-new" onKeyPress={this.handleSubmit}>
                  <input 
                      className="add-new-who"
                      type="text" 
                      autoFocus
                      ref={this.input}
                      value={this.state.newWho}
                      onChange={this.handleWho} 
                  />

                  <input 
                      className="add-new-wat"
                      type="text" 
                      value={this.state.newWat}
                      onChange={this.handleWat} 
                  />
              </form>

              <p className="preview">
                  {this.state.newWho}
                  <small>{this.state.newWat}</small>
              </p>
          </div>
      </section>
    )
  }
}

export default App;