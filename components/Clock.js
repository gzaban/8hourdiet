import React from 'react';
import {View, Text, StyleSheet} from "react-native";

class Clock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
		};
	}
	componentDidMount() {
		this.interval = setInterval(() => this.getTimeUntil(this.props.deadline), 1000);
	}
	componentWillUnmount() {
		clearInterval(this.interval);
	}

	leadingZero(num) {
		return num < 10 ? '0' + num : num;
	}
	getTimeUntil(deadline) {
		const time = Date.parse(deadline) - Date.parse(new Date());
		if(time < 0) {
			this.setState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

		} else {
			const seconds = Math.floor((time/1000)%60);
			const minutes = Math.floor((time/1000/60)%60);
			const hours = Math.floor((time/(1000*60*60))%24);
			const days = Math.floor(time/(1000*60*60*24));
			this.setState({ days, hours, minutes, seconds });
		}
	}
	render() {
		return(
			<View style={styles.container}>
				<Text className="Clock-days">
					{this.leadingZero(this.state.days)} Days
				</Text>
				<Text className="Clock-hours">
					{this.leadingZero(this.state.hours)} Hours
				</Text>
				<Text className="Clock-minutes">
					{this.leadingZero(this.state.minutes)} Minutes
				</Text>
				<Text className="Clock-seconds">
					{this.leadingZero(this.state.seconds)} Seconds
				</Text>
			</View>
		);
	}
}
export default Clock;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	}});
