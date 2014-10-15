var React = require('react');
var Table = require('./Table');
var Pagination = require('./Pagination');
var SelectField = require('./SelectField');
var SearchField = require('./SearchField');

var SortMixin = require('./SortMixin');
var PageMixin = require('./PageMixin');
var FilterMixin = require('./FilterMixin');

var DataTable = React.createClass({

  mixins: [ SortMixin, PageMixin, FilterMixin ],

  getInitialState() {
    return {
      // Clone the initialData.
      data: this.props.initialData.slice(0)
    };
  },

  render() {
    var page = this.buildPage();

    return this.transferPropsTo(
      <div>
        <div className="pull-left">
          <SelectField
            id="page-menu"
            label="Page size:"
            value={this.state.pageLength}
            options={this.props.pageLengthOptions}
            onChange={this.onPageLengthChange}
          />
          <SearchField
            id="search-field"
            label="Search:"
            value={this.state.filterValues['globalSearch']}
            onChange={this.onFilter.bind(this, 'globalSearch')}
          />
        </div>
        <Pagination
          className="pagination pull-right"
          currentPage={page.currentPage}
          totalPages={page.totalPages}
          onChangePage={this.onChangePage}
        />
        <Table
          className="table table-bordered"
          dataArray={page.data}
          columns={this.props.columns}
          keys={this.props.keys}
          sortBy={this.state.sortBy}
          onSort={this.onSort}
        />
      </div>
    );
  }
});

module.exports = DataTable;
