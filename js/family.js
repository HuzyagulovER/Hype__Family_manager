var familyManager = new Vue({ //Man 2AC
	el: '#app',
	data: {
		active: true,
		activeModal: false,
		activeDelete: false,
		activeChangeRank: false,
		activeDisbandModal: false,
		header: 'SYNDICATE',		//Header name for dev. Delete for use.
		page: 0,
		desc_1: null,
		desc_2: null,
		newdesc_1: null,
		newdesc_2: null,
		allranks: [
			{ Rank: '1', RankName: 'რანგი 01' },
			{ Rank: '2', RankName: 'რანგი 02' },
			{ Rank: '3', RankName: 'რანგი 03' },
			{ Rank: '4', RankName: 'რანგი 04' },
			{ Rank: '5', RankName: 'რანგი 05' },
			{ Rank: '6', RankName: 'რანგი 06' },
			{ Rank: '7', RankName: 'რანგი 07' },
			{ Rank: '8', RankName: 'რანგი 08' },
			{ Rank: '9', RankName: 'რანგი 09' },
			{ Rank: '10', RankName: 'რანგი 10' },		//All of points for dev. Delete for use.
		],
		familyrank: 0,
		familyrankname: 10,
		familyimg: "images/hype.png",
		member: [false, 99, "MIKE_ROBOX", 10, "Rang10"],		//All of points for dev. Delete for use.
		members: [
			[true, 99, "MIKE_ROBOX", 10, "Rang10"],
			[false, 99, "MIKE_ROBOX", 10, "Rang10"],
			[false, 99, "MIKE_ROBOX", 10, "Rang10"],
			[false, 99, "MIKE_ROBOX", 10, "Rang10"],
			[false, 99, "MIKE_ROBOX", 10, "Rang10"],
			[false, 99, "MIKE_ROBOX", 10, "Rang10"],
			[false, 99, "MIKE_ROBOX", 10, "Rang10"],
			[false, 99, "MIKE_ROBOX", 10, "Rang10"],
			[false, 99, "MIKE_ROBOX", 10, "Rang10"],
			[false, 99, "MIKE_ROBOX", 10, "Rang10"],
			[false, 99, "MIKE_ROBOX", 10, "Rang10"],		//All of points for dev. Delete for use.
		],
		membermax: 0,
		membercount: 0,
		membersonline: 0,
		changeRank: null,
		modalRank: false,
		reasonKick: null,
		invitePlayerID: null,
	},
	methods: {
		setinfo(json) {
			this.header = json[6]
			this.familyrank = json[0]
			this.familyrankname = json[1]
			this.familyimg = json[5]
			this.membermax = json[2]
			this.membercount = json[3]
			this.membersonline = json[4]
			this.desc_1 = json[7]
			this.desc_2 = json[8]
			this.allranks = json[9]
		},
		invitePlayer(value) {
			// mp.trigger("invitePlayerToFamily", value);
			this.closeMenu()
		},
		changerank(member) {
			this.member = member
			this.modalRank = true
			this.activeModal = true
		},
		deleteMember(member) {
			this.member = member
			this.activeModal = true
			this.activeDelete = true
		},
		changePage(value) {
			// if (value == 1) mp.trigger("loadfamilymemberstomenu", "client")
			this.page = value
		},
		btnAccept() {
			if (this.activeModal) {
				var id = this.member[1]
				if (id == "-") id = this.member[2]
			}
			if (this.modalRank) {
				mp.trigger("changefamilyrank", id, parseInt(this.changeRank));
			}
			if (this.activeDelete) {
				mp.trigger("kickfamilymember", id, this.reasonKick);
			}
			if (this.activeDisbandModal) {
				mp.trigger("disbandFamily", this.reasonKick);
			}
			this.closeMenu()
		},
		saveSettings() {
			if (this.activeChangeRank) {
				mp.trigger("saveChangesRanks", JSON.stringify(this.allranks));
			}
			else {
				mp.trigger("saveFamilySettings", this.newdesc_1, this.newdesc_2);
			}
			this.closeMenu();
		},
		rankSettings() {
			this.activeChangeRank = true;
		},
		disbandFamily() {
			this.activeDisbandModal = true;
		},
		cancelmodal() {
			this.activeModal = false
			this.activeChangeRank = false
			this.activeDisbandModal = false
			this.activeDelete = false
			this.modalRank = false
		},
		closeMenu() {
			this.active = false
			this.page = 0
			this.resetData()
			mp.trigger("closeFamilyManagerMenu")
		},
		resetData() {
			this.member = null
			this.cancelmodal()
			this.reasonKick = null
			this.invitePlayerID = null
		}
	}
})
