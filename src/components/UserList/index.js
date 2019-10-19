import React from 'react';
import axios from 'axios';

class ListUsers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            users: [],
            showUserForm: false,
            name: '',
            surname: '',
            age: '',
            email: '',
        };
    }
    state = {
        loading: false,
        users: [],
        showUserForm: false,
        name: '',
        surname: '',
        age: '',
        email: '',
    }

    componentDidMount() {
        this.fetchUsers();
    }

    componentDidUpdate(_, __) {
        console.log('state: ', this.state);
    }


    toggleUserForm = () => {
        this.setState({ showUserForm: !this.state.showUserForm });
    }

    handleFormChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({ [name]: value });
    }

    render() {
        const { loading, users, showUserForm, name, age, surname, email } = this.state;
        if (loading) {
            return <h1>Carregando...</h1>
        }

        if (users.length <= 0 ) {
            return <h1>Nenhum usuário encontrado!</h1>
        }

        return (
            <>
            <div className="container">
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Segundo Nome</th>
                        <th scope="col">Idade</th>
                        <th scope="col">e-mail</th>
                    </tr>
                </thead>
                <tbody>
                {users.map(user => {
                    return (
                        <tr key={user.id}>
                            <th>{user.id}</th>
                            <th>{user.name}</th>
                            <th>{user.surname}</th>
                            <th>{user.age}</th>
                            <th>{user.email}</th>
                        </tr>
                    )
                } )}
                </tbody>
            </table>
            <div className="row">
                <div className="container">
                    <button className="btn btn-light" onClick={this.toggleUserForm}>Adicionar usuário</button>
                </div>
            </div>

            {showUserForm && (
            <div className="row mt-5 mb-5">
                <div className="container">
                <div class="form-group">
                    <label for="name">Primeiro nome</label>
                    <input value={name} onChange={e => this.handleFormChange(e)} type="text" class="form-control" name="name" id="name" placeholder="Primeiro nome" />
                </div>

                <div class="form-group">
                    <label for="surname">Segundo nome</label>
                    <input value={surname} onChange={e => this.handleFormChange(e)} type="text" class="form-control" name="surname" id="surname" placeholder="Segundo nome" />
                </div>

                <div class="form-group">
                    <label for="age">Idade</label>
                    <input value={age} onChange={e => this.handleFormChange(e)} type="text" class="form-control" name="age" id="age" placeholder="Idade" />
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input value={email} onChange={e => this.handleFormChange(e)} type="text" class="form-control" name="email" id="email" placeholder="Email" />
                </div>
                <button onClick={() => this.addUser({age: Number(age), name, surname, email})} className="btn btn-outline-primary">Adicionar usuário</button>
            </div>
            </div>
            )}
            </div>
            </>
        )
    }

    fetchUsers() {
        this.setState({ loading: true });
        axios.get(`${process.env.REACT_APP_API_URL}/api/v1/retrieve`)
        .then(res => {
            if (res) {
                const { data: { users } } = res;
                this.setState({ users, loading: false });
            }
        })
        .catch(err => {
            console.log('error on get: ', err);
            this.setState({ loading: false });
        });
    }

    addUser = user => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/tef/save`, user)
            .then(res => {
                console.log('res: ', res);
                this.setState({ user: {
                    name: '',
                    surname: '',
                    age: '',
                    email: '',
                },
                showUserForm: false,
            })
            })
            .catch(err => console.log('error on save: ', err));

            this.fetchUsers();
    }
}

export default ListUsers;
