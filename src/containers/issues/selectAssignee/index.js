import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import onClickOutside from 'react-onclickoutside';
import {Button} from '../../../components/button';
import {Spinner} from '../../../components/spinner';

import './selectAssignee.scss';

class SelectAssigneeComponent extends React.PureComponent {
  state = {
    isOpen: false,
  };

  handleSelect = (item) => {
    const {onSelect} = this.props;
    onSelect(item);
    this.handleClose();
  };

  handleClickOutside = () => {
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
          loader={<Spinner/>}
          height={200}
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
        <section className="select-assignee__select-container">
          <button
            className="select-assignee__value"
            onClick={this.handleOpen}
          >
            {value ? this.renderSelectedValue(value) : this.renderPlaceholder()}
          </button>
          <Button
            size='sm'
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

export const SelectAssignee = onClickOutside(SelectAssigneeComponent);