// vol 中的 track

import React from 'react';
import reactCSS from 'reactcss';
import PureRenderMixin from 'react-addons-pure-render-mixin';


class Track extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        // 设置 reactCSS 不支持的 CSS 属性
        this.refs.name.style.webkitLineClamp = 1;
        this.refs.album.style.webkitLineClamp = 1;
        this.refs.name.style.webkitBoxOrient = 'block-axis';
        this.refs.album.style.webkitBoxOrient = 'block-axis';
    }

    handleClick() {
        const track = this.refs.track;
        // 切换 track 的 class 以显示动画
        track.className = 'track clicked';
        setTimeout(() => {
            track.className = 'track';
        }, 600);
        // 播放该 track
        this.props.play(this.props.volData, this.props.index);
    }

    render() {
        return(
            <div
                ref={'track'}
                className="track"
                onClick={this.handleClick}
                style={this.style().track}
            >
                <div style={this.style().coverContainer}>
                    <img
                        src={this.props.data.cover || '../pic/cover.jpg'}
                        style={this.style().cover}
                    />
                </div>
                <div style={this.style().detailContainer}>
                    <span ref={"name"} style={this.style().name}>
                        {this.props.data.name || 'Loading...'}
                    </span>
                    <div ref={"album"} style={this.style().album}>
                        <span style={this.style().albumText}>{this.props.data.album || 'Album'}</span>
                        <span style={this.style().albumText}> - </span>
                        <span style={this.style().albumText}>{this.props.data.artist || 'Artist'}</span>
                    </div>
                </div>
            </div>
        )
    }

    style() {return(reactCSS({
        default: {
            track: {
                width: '100%',
                height: '50px',
                margin: '15px 0',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-center',
                alignItems: 'center',
                fontWeight: 'normal',
                borderRadius: '4px',
                cursor: 'pointer',
                color: 'rgb(125, 125, 125)',
                overflow: 'hidden'
            },
            coverContainer: {
                width: '45px',
                height: '45px',
                margin: '0 25px 0 4px',
                overflow: 'hidden',
                borderRadius: '4px',
                boxShadow: 'rgba(34, 34, 34, 0.3) 0px 0px 5px 2px',
            },
            cover: {
                height: '100%',
                width: '100%',
                cursor: 'pointer'
            },
            detailContainer: {
                width: 'calc(100% - 100px)'
            },
            name: {
                fontSize: '1.2em',
                fontWeight: 'normal',
                marginRight: '30px',
                color: '#E06979',
                cursor: 'pointer',
                display: '-webkit-inline-box',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: 'auto',
                position: 'relative',
                top: '3px'
            },
            album: {
                fontSize: '0.85em',
                cursor: 'pointer',
                display: '-webkit-inline-box',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: 'auto',
                margin: '-5px 0 -1px 0'
            },
            albumText: {
                cursor: 'pointer',
            }
        }
    }, this.props, this.state))}
}


export default Track;