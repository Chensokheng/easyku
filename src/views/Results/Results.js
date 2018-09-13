import React from 'react';
import ReactLoading from 'react-loading';
import './styles.css';


class GenericView extends React.Component {

    state = {
        loading: true,
        datas: []
    }

    componentDidMount() {
        fetch(this.props.url).then(resp => {
            resp.json().then(datas => {
                this.setState({ datas, loading: false })
            })
        })
    }


    render() {
        const { loading, datas } = this.state;
        return (
            <div>
                {
                    loading ?
                        <div className='container' style={{ minHeight: window.innerHeight - 200, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <ReactLoading type={'spin'} color={'blue'} height={50} width={50} className='loader' />
                        </div>
                        :
                        <div>
                            {
                                datas.map((data, key) =>
                                    <div key={key} className="ListItem">
                                        <h4 className="Text">{data.title}</h4>
                                        <a className="downloadButton" href={data.link}><button className='downloadButton'>Download</button></a>
                                    </div>
                                )
                            }
                        </div>
                }
            </div>
        )
    }
}


const Notifications = () => <GenericView url='https://kerala-university-api.herokuapp.com/notifications'/>
const Results = () => <GenericView url='https://kerala-university-api.herokuapp.com/results'/>

export {
    Notifications,
    Results
}