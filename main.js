let dateTime = luxon.DateTime;

const { createApp } = Vue;

createApp({
  data() {
    return {
      contacts,
      activeContactIndex: 0,

      newMessage: {
        date: dateTime.local().toFormat("dd/MM/yyyy h:mm:ss"),
        message: "",
        status: "sent",
      },
      searchTerm: "",
    };
  },

  methods: {
    // Creazione del metodo filteredContacts: Abbiamo creato un nuovo metodo chiamato filteredContacts, che restituisce una lista di contatti filtrata in base al termine di ricerca. Questo metodo utilizza il metodo toLowerCase() per rendere la ricerca case-insensitive e includes per verificare se il nome del contatto contiene il termine di ricerca.
    filteredContacts() {
      const searchTerm = this.searchTerm.toLowerCase();
      return this.contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm)
      );
    },
    // CONTATTO ATTIVO
    setActiveContactIndex(index) {
      this.activeContactIndex = index;
    },

    // NUOVO MESSAGGIO
    sendNewMessage() {
      if (this.newMessage.message == "") return;

      const newMessageStatic = { ...this.newMessage };
      this.contacts[this.activeContactIndex].messages.push(newMessageStatic);
      this.newMessage.message = "";

      // RISPOSTA AUTOMATICA
      setTimeout(() => {
        const newAnswer = {
          date: dateTime.local().toFormat("dd/MM/yyyy h:mm:ss"),
          message: "Ok",
          status: "received",
        };

        this.contacts[this.activeContactIndex].messages.push(newAnswer);
      }, 1000);
    },

    timeToText(timestring) {
      const messageDateTime = dateTime.fromFormat(
        timestring,
        "dd/MM/yyyy h:mm:ss"
      );

      const timeText = messageDateTime.toLocaleString(dateTime.TIME_SIMPLE);

      return timeText;
    },
  },

  mounted() {},
}).mount("#app");
