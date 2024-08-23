<!-- components/Login.vue -->
<template>
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" v-model="email" required placeholder="e-mail" />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" v-model="password" required />
            </div>
            <button type="submit">Login</button>
        </form>
        <div @click="onSignIn()" class="g-signin2" data-onsuccess="onSignIn"></div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('/api/users/login', {
                    email: this.email,
                    password: this.password
                });
                localStorage.setItem('token', response.data.token);
                this.$router.push('/dashboard');
            } catch (error) {
                console.error('Error logging in:', error);
                alert('Invalid credentials');
            }
        },
        async onSignIn(googleUser) {
            const id_token = googleUser.getAuthResponse().id_token;
            try {
                const response = await axios.post('/api/users/google-login', { id_token });
                localStorage.setItem('token', response.data.token);
                this.$router.push('/dashboard');
            } catch (error) {
                console.error('Error logging in with Google:', error);
                alert('Google login failed');
            }
        }
    },
    mounted() {
        window.onSignIn = this.onSignIn;
    }
};
</script>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-group input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

.g-signin2 {
    margin-top: 20px;
    
}
</style>
