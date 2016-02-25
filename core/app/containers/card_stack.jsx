<<<<<<< HEAD
import { CardStackBuilder, Card } from "../components/cardStackBuilder";
import React, {Component} from "react";
import { connect } from "react-redux";
import { getUserTeams, setActiveTeam, getActiveTeamChats } from "../actions/index";
=======
import { CardStackBuilder, Card } from '../components/cardStackBuilder';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getUserTeams, setActiveTeam, getActiveTeamChats } from '../actions/index';
import {colors}  from '../constants/color_scheme';
>>>>>>> b6a2e52a0360b615b9d5a1c059e104e457ca32b8

const styles = {
	cardHeader: {
		display: "flex",
		height: "125px",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "10px 20px",
		color: "#fff",
	},
	headerName: {
		margin: 0,
		fontWeight: 500,
		fontSize: "25px",
		textAlign: "right"
	},
	headerTitle: {
		margin: "4px 0 0",
		fontWeight: 300,
		fontSize: "17px",
		opacity: 0.8,
		textAlign: "right"
	}
};

const ProfilePicture = ({ imgSrc, borderColor }) => (
	<img
		style={{
			width: "60px",
			height: "60px",
			borderRadius: "100%",
			border: `3px solid ${borderColor}`
		}}
		src={imgSrc}
	/>
);

const DetailsRow = ({ icon, title, summary }) => {
	const styles = {
		row: {
			width: "100%",
			padding: "0 20px",
			display: "flex",
			alignItems: "center",
			margin: "25px 0"
		},
		icon: {
			display: "block",
			width: "25px",
			height: "30px",
			margin: "0 20px 0 0",
			borderBottom: "1px solid rgba(255, 255, 255, 0.8)",
			textAlign: "center",
			fontSize: "22px"
		},
		title: {
			fontWeight: 500,
			fontSize: "20px",
			margin: 0,
			fontStyle: "italic"
		}
	};
	const renderSummary = () => {
		if(summary) return (
			<p style={{ fontWeight: 300, lineHeight: 1.45 }}>
				{summary}
			</p>
		);
		return null;
	};

	return (
		<div style={styles.row}>
			<span className={`icon ${icon}`}
			style={Object.assign({}, styles.icon, {alignSelf: "flex-start"})}></span>
			<div style={{ width: "80%" }}>
				<h2 style={styles.title}>
					{title}
				</h2>
				{renderSummary()}
			</div>
		</div>
	);
};

const TeamMemberCard = (props) => (
	<div style={{ position: "absolute", top: 0 }}>
		<header style={styles.cardHeader} className="card-header-details">
			<ProfilePicture imgSrc={props.imgSrc} borderColor={props.imgBorderColor} />
			<div>
				<h1 style={styles.headerName}>{props.name}</h1>
				<h3 style={styles.headerTitle} className="icon ion-ios-arrow-down">{props.title}</h3>
			</div>
		</header>

		<div style={{color: "#fff"}}>
			<DetailsRow
				icon="ion-ios-telephone-outline"
				title={props.mobileNo}
			/>

			<DetailsRow
				icon="ion-ios-location-outline"
				title={props.location}
			/>

			<DetailsRow
				icon="icon ion-ios-paper-outline"
				title="Main Role"
				summary={props.role}
			/>
		</div>
  </div>
);


class CardStack extends Component{
	constructor(props) {
		super(props);
		this.state = {
			width: 0,
			height: 0
		}
		this.updateDimensions = this.updateDimensions.bind(this);
	}
	
	updateDimensions() {
		this.setState({
			width: window.innerWidth,
			height: window.innerHeight-60,
			userTeams: [],
			activeTeam: {}
		})
	}

	componentWillMount() {
		this.props.getUserTeams();
		this.updateDimensions();
	}

	componentDidMount() {
		window.addEventListener("resize", this.updateDimensions);
	}

	comppnentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions);
	}

	checkActiveTeam(teamId) {
		if (teamId === this.props.activeTeam) {
			return false;
		}
	}

	activeTeamClick() {
		if(this.checkActiveTeam(this.props.team._id)){
			this.props.setActiveTeam(this.props.team);
			this.props.getActiveTeamChats(this.props.team._id);
		}
	}

	renderTeamList() {
		let colorArray = [];
		for (var prop in colors) {
			colorArray.push(colors[prop]);
		}
		console.log(colorArray);
		if(!this.props.teams) {
			return (
				<Card background={colors.darkGrey}>
					<div className="testing">
						No Teams					
					</div>
				</Card>
			);
		}
		return this.props.teams.map((team) => {
			<Card onClick={this.activeTeamClick.bind(this)} background="#9B27AE" key={team._id}>
				This is a user team card.
				Team Id: {team._id}
				Team Name: {team.teamName}
			</Card>
		})
	}

	render() {
	
		return (	
			<CardStackBuilder
				height={this.state.height}
				width={250}
<<<<<<< HEAD
				background="#f8f8f8"
			  	hoverOffset={25}>

				<Card background="#2980B9">
=======
				background='#ffffff'
			  	hoverOffset={25}>

				<Card background={colors.blue}>
>>>>>>> b6a2e52a0360b615b9d5a1c059e104e457ca32b8
					<div className="testing">
						This card will be for creating teams and inviting the members.
					</div>
				</Card>

<<<<<<< HEAD
				<Card background="#27AE60">
=======
				<Card background={colors.grey}>
>>>>>>> b6a2e52a0360b615b9d5a1c059e104e457ca32b8
					<div className="testing">
						This card will be for adding members to a team.
					</div>
				</Card>
				{this.renderTeamList()}
			</CardStackBuilder>
		);
	}
}

function mapStateToProps(state) {
	return {
		teams: state.teams,
		activeTeam: state.activeTeam,
	}
}

export default connect(mapStateToProps, { getUserTeams, setActiveTeam, getActiveTeamChats })(CardStack);