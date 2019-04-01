import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Button} from '../../../components/button';
import './selectAssignee.scss';

export class SelectAssignee extends React.PureComponent {
  state = {
    isOpen: false,
  };

  handleSelect = (item) => {
    const {onSelect} = this.props;
    onSelect(item);
    this.handleClose();
  };

  handleClose = () => {
    this.setState({isOpen: false});
  };

  handleOpen = () => {
    this.setState({isOpen: true});
  };

  handleClear = () => {
    const {onSelect} = this.props;
    onSelect(null);
  };

  renderPlaceholder() {
    return (
      <section>Select Assignee</section>
    );
  }

  renderSelectedValue(value) {
    return (<section>{value.login}</section>)
  }

  renderItem = (item) => {
    return (
      <button
        key={item.id}
        className="select-assignee__item"
        onClick={() => this.handleSelect(item)}
      >
        {item.login}
      </button>
    )
  };

  renderList() {
    const {items, onFetch, hasMore = true} = this.props;

    return (
      <section className="select-assignee__list">
        <InfiniteScroll
          dataLength={items.length}
          next={onFetch}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          height={400}
          endMessage={
            <p style={{textAlign: 'center'}}>
              no other data
            </p>
          }
        >
          {
            items.map(this.renderItem)
          }
        </InfiniteScroll>
      </section>
    );
  }

  render() {
    const {value} = this.props;

    const {isOpen} = this.state;

    return (
      <section className="select-assignee">
        <section className="select-assignee__value">
          <button onClick={this.handleOpen}>
            {value ? this.renderSelectedValue(value) : this.renderPlaceholder()}
          </button>
          <Button
            onClick={this.handleClear}
            disabled={!value}
          >
            clear
          </Button>
        </section>
        {
          isOpen && this.renderList()
        }
      </section>
    )
  }
}