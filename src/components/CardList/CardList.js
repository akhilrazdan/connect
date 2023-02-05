import React from 'react';
import Card from '../Card/Card';
import Rank from '../Rank/Rank';

class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mentors: [],
      signupsTotal: 0,
      maxMenteeChoices: 0
    }
  }
  updateMentors = () => {
    console.log("API: gettingMentors")
    fetch(`http://localhost:3000/mentors/${this.props.menteeId}`)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({ mentors: response.mentors, maxMenteeChoices: response.max_mentee_choices, signupsTotal: response.signups_total });
        // TODO add error handline here. 
      });
  }
  onMentorSignup = (mentor) => {
    console.log(`API: Signing up mentor : ${mentor.id} to mentee (${this.props.menteeId}) `);
    fetch('http://localhost:3000/mentorSignup', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mentee: this.props.menteeId,
        mentor: mentor.id
      })
    }).then(response => response.json())
      .then(response => {
        if (response.mentors) {
          console.log("Recieved mentors" + response.mentors)
          this.setState({ mentors: response.mentors, maxMenteeChoices: response.max_mentee_choices, signupsTotal: response.signups_total });
        }
        else {
          console.log("Error: " + response)
          // this.props.error()
          this.updateMentors()
        }
      })
      .catch(err => {
        console.log(err)
        this.props.error()
        this.updateMentors()
      })
  }
  componentDidMount() {
    // TODO should only load when signed in
    // Remaining choices is not correct in debugging mode
    fetch(`http://localhost:3000/mentors/${this.props.menteeId}`)
      .then(response => response.json())
      .then(response => {
        if (response.mentors) {
          console.log(response);
          this.setState({ mentors: response.mentors, maxMenteeChoices: response.max_mentee_choices, signupsTotal: response.signups_total });
        } else {
          console.error("Error: " + response)
        }

      });
  }

  render() {
    console.log("Render shender")
    return (
      <div>
        <Rank
          name={this.props.name}
          signupsTotal={this.state.signupsTotal}
          choicesRemaining={this.state.maxMenteeChoices - this.state.signupsTotal}
        />
        {
          this.state.mentors.map((mentor, i) => {
            return (
              <Card
                key={i}
                id={mentor.id}
                name={mentor.name}
                email={mentor.email}
                availableSlots={mentor.available_slots}
                isRegistered={mentor.registered === 'true'}
                onMentorSignup={this.onMentorSignup}
              />
            );
          })
        }
      </div>
    );

  }
}

export default CardList;