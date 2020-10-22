import React, { Component } from 'react';

class Course extends Component {
	state = {
		courseTitle: '',
	};

	parseQueryParams() {
		const queryParam = new URLSearchParams(this.props.location.search);
		for (const param of queryParam.entries()) {
			if (this.state.courseTitle !== param[1]) {
				this.setState({ courseTitle: param[1] });
			}
		}
	}
	componentDidMount() {
		this.parseQueryParams();
	}

	componentDidUpdate() {
		this.parseQueryParams();
	}
	render() {
		return (
			<div>
				<h1>{this.state.courseTitle}</h1>
				<p>
					You selected the Course with ID:{' '}
					{this.props.match.params.courseId}
				</p>
			</div>
		);
	}
}

export default Course;
