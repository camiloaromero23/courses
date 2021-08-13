<template>
  <img v-if="image" :src="image" alt="bg" />
  <div class="bg-dark"></div>
  <div class="indecision-container">
    <input type="text" placeholder="Ask me a question" v-model="question" />
    <p>Remember to end with a question mark (?)</p>

    <div v-if="validQuestion">
      <h2>{{ question }}</h2>
      <h1>{{ fixedAnswer }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Indecision',
  data() {
    return {
      question: null,
      answer: '',
      image: null,
      validQuestion: false,
    };
  },
  computed: {
    fixedAnswer() {
      return `${this.answer.toUpperCase()}!!!`;
    },
  },
  methods: {
    async getAnswer() {
      try {
        this.answer = 'Thinking...';

        const res = await fetch('https://yesno.wtf/api');
        const data = await res.json();

        this.answer = data.answer;
        this.image = data.image;

        console.log(data);
      } catch {
        this.answer = 'Could not find the API';
        this.image = null;
      }
    },
  },
  watch: {
    question(value) {
      this.validQuestion = false;

      console.log({ value });

      if (value.endsWith('?')) {
        this.validQuestion = true;
        this.getAnswer();
      }
    },
  },
};
</script>

<style scoped>
img,
.bg-dark {
  height: 100vh;
  left: 0px;
  max-height: 100%;
  max-width: 100%;
  position: fixed;
  top: 0px;
  width: 100vw;
}

.bg-dark {
  background-color: rgba(0, 0, 0, 0.4);
}

.indecision-container {
  position: relative;
  z-index: 99;
}

input {
  width: 250px;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
}
input:focus {
  outline: none;
}

p {
  color: white;
  font-size: 20px;
  margin-top: 0px;
}

h1,
h2 {
  color: white;
}

h2 {
  margin-top: 150px;
}
</style>
