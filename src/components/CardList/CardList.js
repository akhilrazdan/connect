import React from 'react';
import Card from '../Card/Card';

class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mentors: []
    }
  }
  updateMentors = () => {
    console.log("Retrieving fresh mentors")
    fetch('http://localhost:3000/mentors')
      .then(response => response.json())
      .then(mentors_ => {
        console.log(mentors_);
        this.setState({ mentors: mentors_ });
        // TODO add error handline here. 
      });
  }
  onMentorSignup = (mentor) => {
    console.log(`Signing up mentor : ${mentor.id} to mentee (${this.props.menteeId}) `);
    fetch('http://localhost:3000/mentorSignup', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mentee: this.props.menteeId,
        mentor: mentor.id
      })
    }).then(response => response.json())
      .then(mentors_ => {
        if (Array.isArray(mentors_)) {
          console.log("Recieved mentors")
          console.log(mentors_)
          this.setState({ mentors: mentors_ });
        }
        else {
          console.log("Error: " + mentors_)
          this.updateMentors()
        }
      })
      .catch(err => {
        console.log(err)
        this.updateMentors()
      })
  }
  componentDidMount() {
    // TODO should only load when signed in
    // Remaining choices is not correct in debugging mode
    fetch('http://localhost:3000/mentors')
      .then(response => response.json())
      .then(mentors_ => {
        console.log(mentors_);
        this.setState({ mentors: mentors_ });
      });
  }

  render() {
    console.log("Render shender")
    return (
      <div>
        {
          this.state.mentors.map((mentor, i) => {
            return (
              <Card
                key={i}
                id={mentor.id}
                name={mentor.name}
                email={mentor.email}
                availableSlots={mentor.available_slots}
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