import React, { Component } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import './Sort.css'

class Sort extends Component {

    handleClickSortCategory(category){
        this.props.handleTest(category);
    }

    render() {
        return (
            <div>
                <InputGroup className="mb-3">
                    <DropdownButton
                    variant="outline-secondary"
                    title="Sort By"
                    >
                        <Dropdown.Item onClick={()=>this.handleClickSortCategory("Time")} as="button">Time</Dropdown.Item>
                        <Dropdown.Item onClick={()=>this.handleClickSortCategory("Likes")} as="button">Likes</Dropdown.Item>
                    </DropdownButton>
                </InputGroup>
            </div>
        );
    }
}

export default Sort;