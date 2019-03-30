import React, {Component} from 'react';
import {connect} from 'react-redux'
import './home.css';
import {applicationsActions} from '../../redux/applications';

const mapStateToProps = (state) => ({
  fakeResponse: state.applications
});

const mapDispatchToProps = {
  fakeRequest: applicationsActions.FAKE.request,
};

export class HomeContainer extends Component {
  componentDidMount() {
    const {fakeRequest} = this.props;
    fakeRequest();
  }

  render() {
    const {fakeResponse: {isLoaded, data}} = this.props;
    if (!isLoaded) return (<div>...Loading</div>);

    return (
      <div className="home">
        {
          data.map(x => (
            <div  className="home__item" key={x.id}>
              {x.title}
            </div>
          ))
        }
      </div>
    );
  }
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeContainer);