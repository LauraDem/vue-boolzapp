var dateTime = luxon.DateTime;

const { createApp } = Vue;

createApp({
  data() {
    return {
      contacts,
      activeContactIndex: 0,

      newMessage:{
        date:'',
        message: '',
        status: 'sent',
      }, 
    };
  },



  methods: {
    // CONTATTO ATTIVO 
    setActiveContactIndex (index) {
      this.activeContactIndex = index;
    },

    // NUOVO MESSAGGIO 
    sendNewMessage() {
      if (this.newMessage.message == '') return;

      const newMessageStatic = { ...this.newMessage };
      this.contacts[this.activeContactIndex].messages.push(newMessageStatic);
      this.newMessage.message = '';


      // RISPOSTA AUTOMATICA 
      setTimeout(() => {
        const newAnswer = {
          date: '...',
          message: 'Ok',
          status: 'received',
        }

        this.contacts[this.activeContactIndex].messages.push(newAnswer);

      }, 1000)
    },

    timeToText(timestring) {


      const messageDateTime = dateTime.fromFormat(timestring, 'dd/MM/yyyy h:mm:ss');

      const timeText = messageDateTime.toLocaleString(dateTime.TIME_SIMPLE);

      return(timeText);
    },
  },

  mounted() {
    
  },

}).mount('#app');