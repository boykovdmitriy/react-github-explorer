import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Button} from '../../../components/button';

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

  renderItem(item) {
    return (
      <button key={item.id} onClick={this.handleSelect}>
        {item.login}
      </button>
    )
  }

  renderList() {
    const {items, onFetch, hasMore = true} = this.props;

    return (
      <section>
        <InfiniteScroll
          dataLength={items.length}
          next={onFetch}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          height={400}
          endMessage={
            <p style={{textAlign: 'center'}}>
              <b>Yay! You have seen it all</b>
            </p>
          }>
          {
            items.map(x => this.renderItem(x))
          }
        </InfiniteScroll>
      </section>
    );
  }

  render() {
    const {value} = this.props;

    const {isOpen} = this.state;

    return (
      <section>
        <section>
          <button onClick={this.handleOpen}>
            {value ? this.renderSelectedValue(value) : this.renderPlaceholder()}
          </button>
          <Button onClick={this.handleClear}>clear</Button>
        </section>
        {
          isOpen && this.renderList()
        }
      </section>
    )
  }
}