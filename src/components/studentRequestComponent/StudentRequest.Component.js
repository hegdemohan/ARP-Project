import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import './StudentRequest.Component.css';
import axios from 'axios';
import Base64 from 'Base64';

class StudentRequest extends Component {
    StudentData;
    transcriptData = [];
    subData = [];
    dataSubs;
    Data;
    dataa;
    selectedSubjects = [];
    constructor(props) {
        super(props)
        this.state = {
            data: "",
            base64: "",
            fileName: ""
        }
        this.init = this.init.bind(this);
        this.approve = this.approve.bind(this);
        this.handleRowSelect = this.handleRowSelect.bind(this);
        this.base64ToArrayBuffer = this.base64ToArrayBuffer.bind(this);
        this.transcript = this.transcript.bind(this);


    }
    componentDidMount() {
        this.selectRowProp = {
            mode: 'checkbox',
            selected: [],
            onSelect: this.handleRowSelect
            // selected: false
            // unelectable: ["row1"]
        };
        this.Data = JSON.parse(localStorage.getItem("StudentRequestData"));
        this.transcriptData = JSON.parse(this.Data.transcript.ocrJson);
        console.log((this.transcriptData));
        this.StudentData = JSON.parse(localStorage.getItem("UserDetail"));
        // console.log(this.StudentData);
        this.setState({ data: this.StudentData });
        this.dataSubs = this.StudentData.subjects;
        // this.setState({ dataSubs: this.StudentData.subjects });
        this.init();
    }

    init() {
        this.StudentData.subjects.map((subject) => {
            // this.updatedSubjects.push(subject);
            if (subject.isSelected) {
                this.selectRowProp.selected.push(subject.module);
                this.selectedSubjects.push(subject);

            }
        });
        // console.log(this.selectedSubjects);
    }

    handleRowSelect(row, isSelected, e) {
        for (let i = 0; i < this.dataSubs.length; i++) {
            if (this.dataSubs[i].subjectID === row.subjectID) {
                this.dataSubs[i].isSelected = isSelected;
                console.log(this.dataSubs[i]);
            }
        }
        this.dataSubs.map((subject) => {
            if (subject.subjectID === row.subjectID) {
                if (!(subject.isSelected)) {
                    subject.isSelected = true;
                    subject.isRejectedByAdmin = true;
                    console.log(subject, "false");
                }
                else {
                    subject.isSelected = true;
                    subject.isRejectedByAdmin = false;
                    console.log(subject, "true");
                }
            }
        });
        console.log(this.dataSubs);

    }
    base64ToArrayBuffer(data) {
        var binaryString = window.atob(window.btoa(data));
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
            var ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    };
    transcript() {
        this.dataa = "data:application/pdf;base64,JVBERi0xLjMKJbrfrOAKMyAwIG9iago8PC9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL1Jlc291cmNlcyAyIDAgUgovTWVkaWFCb3ggWzAgMCA1OTUuMjggODQxLjg5XQovQ29udGVudHMgNCAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL0xlbmd0aCAxNjM3Cj4+CnN0cmVhbQowLjU3IHcKMCBHCnEKMC43OCBnCjQyLjUyIDc3MS4wMiAyMjMuMjMgLTYwLjY2IHJlCkIKQlQKL0YyIDE2IFRmCjE4LjQwIFRMCjAgZwo1MS4wMiA3MTguODcgVGQKKFN1YmplY3QgSUQpIFRqCkVUCjAuNzggZwoyNjUuNzUgNzcxLjAyIDIyMi44MyAtNjAuNjYgcmUKQgpCVAovRjIgMTYgVGYKMTguNDAgVEwKMCBnCjI3NC4yNSA3MTguODcgVGQKKFN1YmplY3QgTmFtZSkgVGoKRVQKMC43OCBnCjQyLjUyIDYyNS4zMiAyMjMuMjMgLTYwLjY2IHJlCkIKQlQKL0YyIDE2IFRmCjE4LjQwIFRMCjAgZwo1MS4wMiA1NzMuMTcgVGQKKENMXzAwMSkgVGoKRVQKMC43OCBnCjI2NS43NSA2MjUuMzIgMjIyLjgzIC02MC42NiByZQpCCkJUCi9GMiAxNiBUZgoxOC40MCBUTAowIGcKMjc0LjI1IDU3My4xNyBUZAooU3VwcGx5IENoYWluIE1hbmFnZW1lbnQpIFRqCkVUCjQyLjUyIDU2NC42NiAyMjMuMjMgLTYwLjY2IHJlClMKQlQKL0YxIDE2IFRmCjE4LjQwIFRMCjAgZwo1MS4wMiA1MTIuNTAgVGQKKENMXzAwMikgVGoKRVQKMjY1Ljc1IDU2NC42NiAyMjIuODMgLTYwLjY2IHJlClMKQlQKL0YxIDE2IFRmCjE4LjQwIFRMCjAgZwoyNzQuMjUgNTEyLjUwIFRkCihTdXBwbHkgQ2hhaW4gTWFuYWdlbWVudCkgVGoKRVQKNDIuNTIgNTA0LjAwIDIyMy4yMyAtNjAuNjYgcmUKUwpCVAovRjEgMTYgVGYKMTguNDAgVEwKMCBnCjUxLjAyIDQ1MS44NCBUZAooQ0xfMDAzKSBUagpFVAoyNjUuNzUgNTA0LjAwIDIyMi44MyAtNjAuNjYgcmUKUwpCVAovRjEgMTYgVGYKMTguNDAgVEwKMCBnCjI3NC4yNSA0NTEuODQgVGQKKEFtYmllbnQgSW50ZWxsaWdlbmNlIFN5c3RlbSkgVGoKRVQKNDIuNTIgNDQzLjM0IDIyMy4yMyAtMTEyLjgyIHJlClMKQlQKL0YxIDE2IFRmCjE4LjQwIFRMCjAgZwo1MS4wMiAzOTEuMTggVGQKKENMXzAwNCkgVGoKRVQKMjY1Ljc1IDQ0My4zNCAyMjIuODMgLTExMi44MiByZQpTCkJUCi9GMSAxNiBUZgoxOC40MCBUTAowIGcKMjc0LjI1IDM5MS4xOCBUZAooQWR2YW5jZWQgTW9kZWxsaW5nIGFuZCkgVGoKVCogKFNpbXVsYXRpb24pIFRqCkVUCjQyLjUyIDMzMC41MiAyMjMuMjMgLTYwLjY2IHJlClMKQlQKL0YxIDE2IFRmCjE4LjQwIFRMCjAgZwo1MS4wMiAyNzguMzYgVGQKKENMXzAwNSkgVGoKRVQKMjY1Ljc1IDMzMC41MiAyMjIuODMgLTYwLjY2IHJlClMKQlQKL0YxIDE2IFRmCjE4LjQwIFRMCjAgZwoyNzQuMjUgMjc4LjM2IFRkCihTdXBwbHkgQ2hhaW4gTWFuYWdlbWVudCkgVGoKRVQKNDIuNTIgMjY5Ljg2IDIyMy4yMyAtNjAuNjYgcmUKUwpCVAovRjEgMTYgVGYKMTguNDAgVEwKMCBnCjUxLjAyIDIxNy43MCBUZAooQ0xfMDA2KSBUagpFVAoyNjUuNzUgMjY5Ljg2IDIyMi44MyAtNjAuNjYgcmUKUwpCVAovRjEgMTYgVGYKMTguNDAgVEwKMCBnCjI3NC4yNSAyMTcuNzAgVGQKKFN1cHBseSBDaGFpbiBNYW5hZ2VtZW50KSBUagpFVAo0Mi41MiAyMDkuMjAgMjIzLjIzIC02MC42NiByZQpTCkJUCi9GMSAxNiBUZgoxOC40MCBUTAowIGcKNTEuMDIgMTU3LjA0IFRkCihDTF8wMDcpIFRqCkVUCjI2NS43NSAyMDkuMjAgMjIyLjgzIC02MC42NiByZQpTCkJUCi9GMSAxNiBUZgoxOC40MCBUTAowIGcKMjc0LjI1IDE1Ny4wNCBUZAooQW1iaWVudCBJbnRlbGxpZ2VuY2UgU3lzdGVtKSBUagpFVAplbmRzdHJlYW0KZW5kb2JqCjUgMCBvYmoKPDwvVHlwZSAvUGFnZQovUGFyZW50IDEgMCBSCi9SZXNvdXJjZXMgMiAwIFIKL01lZGlhQm94IFswIDAgNTk1LjI4IDg0MS44OV0KL0NvbnRlbnRzIDYgMCBSCj4+CmVuZG9iago2IDAgb2JqCjw8Ci9MZW5ndGggMTI1NQo+PgpzdHJlYW0KMC41NyB3CjAgRwowLjc4IGcKNDIuNTIgODA1LjA0IDIyMy4yMyAtNjAuNjYgcmUKQgpCVAovRjIgMTYgVGYKMTguNDAgVEwKMCBnCjUxLjAyIDc1Mi44OCBUZAooQ0xfMDAxKSBUagpFVAowLjc4IGcKMjY1Ljc1IDgwNS4wNCAyMjIuODMgLTYwLjY2IHJlCkIKQlQKL0YyIDE2IFRmCjE4LjQwIFRMCjAgZwoyNzQuMjUgNzUyLjg4IFRkCihTdXBwbHkgQ2hhaW4gTWFuYWdlbWVudCkgVGoKRVQKNDIuNTIgNzc2LjY5IDIyMy4yMyAtMTEyLjgyIHJlClMKQlQKL0YxIDE2IFRmCjE4LjQwIFRMCjAgZwo1MS4wMiA3MjQuNTQgVGQKKENMXzAwOCkgVGoKRVQKMjY1Ljc1IDc3Ni42OSAyMjIuODMgLTExMi44MiByZQpTCkJUCi9GMSAxNiBUZgoxOC40MCBUTAowIGcKMjc0LjI1IDcyNC41NCBUZAooQWR2YW5jZWQgTW9kZWxsaW5nIGFuZCkgVGoKVCogKFNpbXVsYXRpb24pIFRqCkVUCjQyLjUyIDY2My44NyAyMjMuMjMgLTYwLjY2IHJlClMKQlQKL0YxIDE2IFRmCjE4LjQwIFRMCjAgZwo1MS4wMiA2MTEuNzIgVGQKKENMXzAwOSkgVGoKRVQKMjY1Ljc1IDY2My44NyAyMjIuODMgLTYwLjY2IHJlClMKQlQKL0YxIDE2IFRmCjE4LjQwIFRMCjAgZwoyNzQuMjUgNjExLjcyIFRkCihTdXBwbHkgQ2hhaW4gTWFuYWdlbWVudCkgVGoKRVQKNDIuNTIgNjAzLjIxIDIyMy4yMyAtNjAuNjYgcmUKUwpCVAovRjEgMTYgVGYKMTguNDAgVEwKMCBnCjUxLjAyIDU1MS4wNiBUZAooQ0xfMDAxMCkgVGoKRVQKMjY1Ljc1IDYwMy4yMSAyMjIuODMgLTYwLjY2IHJlClMKQlQKL0YxIDE2IFRmCjE4LjQwIFRMCjAgZwoyNzQuMjUgNTUxLjA2IFRkCihTdXBwbHkgQ2hhaW4gTWFuYWdlbWVudCkgVGoKRVQKNDIuNTIgNTQyLjU1IDIyMy4yMyAtNjAuNjYgcmUKUwpCVAovRjEgMTYgVGYKMTguNDAgVEwKMCBnCjUxLjAyIDQ5MC4zOSBUZAooQ0xfMDAxMSkgVGoKRVQKMjY1Ljc1IDU0Mi41NSAyMjIuODMgLTYwLjY2IHJlClMKQlQKL0YxIDE2IFRmCjE4LjQwIFRMCjAgZwoyNzQuMjUgNDkwLjM5IFRkCihBbWJpZW50IEludGVsbGlnZW5jZSBTeXN0ZW0pIFRqCkVUCjQyLjUyIDQ4MS44OSAyMjMuMjMgLTExMi44MiByZQpTCkJUCi9GMSAxNiBUZgoxOC40MCBUTAowIGcKNTEuMDIgNDI5LjczIFRkCihDTF8wMDEyKSBUagpFVAoyNjUuNzUgNDgxLjg5IDIyMi44MyAtMTEyLjgyIHJlClMKQlQKL0YxIDE2IFRmCjE4LjQwIFRMCjAgZwoyNzQuMjUgNDI5LjczIFRkCihBZHZhbmNlZCBNb2RlbGxpbmcgYW5kKSBUagpUKiAoU2ltdWxhdGlvbikgVGoKRVQKUQplbmRzdHJlYW0KZW5kb2JqCjEgMCBvYmoKPDwvVHlwZSAvUGFnZXMKL0tpZHMgWzMgMCBSIDUgMCBSIF0KL0NvdW50IDIKPj4KZW5kb2JqCjcgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9IZWx2ZXRpY2EKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKOCAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0hlbHZldGljYS1Cb2xkCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjkgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9IZWx2ZXRpY2EtT2JsaXF1ZQovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxMCAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0hlbHZldGljYS1Cb2xkT2JsaXF1ZQovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxMSAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0NvdXJpZXIKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTIgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9Db3VyaWVyLUJvbGQKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTMgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9Db3VyaWVyLU9ibGlxdWUKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9Db3VyaWVyLUJvbGRPYmxpcXVlCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjE1IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvVGltZXMtUm9tYW4KL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTYgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9UaW1lcy1Cb2xkCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjE3IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvVGltZXMtSXRhbGljCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjE4IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvVGltZXMtQm9sZEl0YWxpYwovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxOSAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL1phcGZEaW5nYmF0cwovU3VidHlwZSAvVHlwZTEKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoyMCAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL1N5bWJvbAovU3VidHlwZSAvVHlwZTEKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoyIDAgb2JqCjw8Ci9Qcm9jU2V0IFsvUERGIC9UZXh0IC9JbWFnZUIgL0ltYWdlQyAvSW1hZ2VJXQovRm9udCA8PAovRjEgNyAwIFIKL0YyIDggMCBSCi9GMyA5IDAgUgovRjQgMTAgMCBSCi9GNSAxMSAwIFIKL0Y2IDEyIDAgUgovRjcgMTMgMCBSCi9GOCAxNCAwIFIKL0Y5IDE1IDAgUgovRjEwIDE2IDAgUgovRjExIDE3IDAgUgovRjEyIDE4IDAgUgovRjEzIDE5IDAgUgovRjE0IDIwIDAgUgo+PgovWE9iamVjdCA8PAo+Pgo+PgplbmRvYmoKMjEgMCBvYmoKPDwKL1Byb2R1Y2VyIChqc1BERiAxLjUuMykKL0NyZWF0aW9uRGF0ZSAoRDoyMDE5MDUyODE2NTkyMSswMicwMCcpCj4+CmVuZG9iagoyMiAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMSAwIFIKL09wZW5BY3Rpb24gWzMgMCBSIC9GaXRIIG51bGxdCi9QYWdlTGF5b3V0IC9PbmVDb2x1bW4KPj4KZW5kb2JqCnhyZWYKMCAyMwowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDMyMjkgMDAwMDAgbiAKMDAwMDAwNTA1NCAwMDAwMCBuIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDAxMjQgMDAwMDAgbiAKMDAwMDAwMTgxMyAwMDAwMCBuIAowMDAwMDAxOTIyIDAwMDAwIG4gCjAwMDAwMDMyOTIgMDAwMDAgbiAKMDAwMDAwMzQxNyAwMDAwMCBuIAowMDAwMDAzNTQ3IDAwMDAwIG4gCjAwMDAwMDM2ODAgMDAwMDAgbiAKMDAwMDAwMzgxOCAwMDAwMCBuIAowMDAwMDAzOTQyIDAwMDAwIG4gCjAwMDAwMDQwNzEgMDAwMDAgbiAKMDAwMDAwNDIwMyAwMDAwMCBuIAowMDAwMDA0MzM5IDAwMDAwIG4gCjAwMDAwMDQ0NjcgMDAwMDAgbiAKMDAwMDAwNDU5NCAwMDAwMCBuIAowMDAwMDA0NzIzIDAwMDAwIG4gCjAwMDAwMDQ4NTYgMDAwMDAgbiAKMDAwMDAwNDk1OCAwMDAwMCBuIAowMDAwMDA1MzA0IDAwMDAwIG4gCjAwMDAwMDUzOTAgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSAyMwovUm9vdCAyMiAwIFIKL0luZm8gMjEgMCBSCi9JRCBbIDwyMkM3Qjk0MkRCM0U3RDRBQjhENTkwQTcwRkVCMzZBOT4gPDIyQzdCOTQyREIzRTdENEFCOEQ1OTBBNzBGRUIzNkE5PiBdCj4+CnN0YXJ0eHJlZgo1NDk0CiUlRU9G"
        window.open(Base64.encode(this.dataa));
        // var arrBuffer = this.base64ToArrayBuffer(this.dataa);

        // // It is necessary to create a new blob object with mime-type explicitly set
        // // otherwise only Chrome works like it should
        // var newBlob = new Blob([arrBuffer], { type: "application/pdf" });

        // // IE doesn't allow using a blob object directly as link href
        // // instead it is necessary to use msSaveOrOpenBlob
        // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        //     window.navigator.msSaveOrOpenBlob(newBlob);
        //     return;
        // }

        // // For other browsers: 
        // // Create a link pointing to the ObjectURL containing the blob.
        // var data = window.URL.createObjectURL(newBlob);

        // var link = document.createElement('a');
        // document.body.appendChild(link); //required in FF, optional for Chrome
        // link.href = data;
        // link.download = "file.pdf";
        // link.click();
        // window.URL.revokeObjectURL(data);
        // link.remove();
        // // decode base64 string, remove space for IE compatibility
        // // var binary = atob(dataa);
        // // var len = binary.length;
        // // var buffer = new ArrayBuffer(len);
        // // var view = new Uint8Array(buffer);
        // // for (var i = 0; i < len; i++) {
        // //     view[i] = binary.charCodeAt(i);
        // // }


        // // // create the blob object with content-type "application/pdf"               
        // // var blob = new Blob([view], { type: "application/pdf" });
        // // var url = URL.createObjectURL(blob);
        // // console.log(url);
        // // window.open(Base64.decode(dataa));
    }
    approve() {
        var loader = document.getElementById("loader");
        loader.className = "fullScreen";
        loader.firstChild.style.display = "inline-block";
        var postData =
        {
            "firstName": this.state.data.firstName,
            "lastName": this.state.data.lastName,
            "matriculationNumber": this.state.data.matriculationNumber,
            "studentID": this.state.data.studentID,
            "subjects": this.dataSubs,
            // [
            //     {

            //         "subjectID": subject.subjectID,
            //         "subjectMappingID": subject.subjectMappingID,
            //         "subjectName": subject.subjectName,
            //         "module": subject.module,
            //         "isSelected": true,
            //         "isRejectedByAdmin": true
            //     }
            // ],
            "transcript": {
                "fileData": this.transcriptData.transcript.base64,
                "fileName": this.transcriptData.transcript.fileName
            },
            "isUpdate": true,
            "isLearningAgreementApproved": true
        }
        axios
            .post(
                "https://dee35bf9.ngrok.io/api/approveLearningAgreement", postData
            )
            .then(res => {
                loader.className = "";
                loader.firstChild.style.display = "none";
                this.props.history.push("/requests/");
            });
    }
    render() {

        return (
            <div>
                <div id="loader">
                    <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-12 mx-auto">
                            <div className="card my-5">
                                <div className="card-body">
                                    <h3 className="card-title text-center">Student Details</h3>
                                    <hr className="my-6"></hr>
                                    {/* <div className="row"> */}
                                    <div>First Name: {this.state.data.firstName}</div>
                                    <div>Last Name: {this.state.data.lastName}</div>
                                    <div>Matriculation Number: {this.state.data.matriculationNumber}</div>
                                    <div className="row">
                                        <div className="col-6">
                                            <h2 className="col-12 my-3">Requested Subjects:</h2>
                                            <BootstrapTable version='4' selectRow={this.selectRowProp} className="table table-striped" data={this.selectedSubjects}>
                                                <TableHeaderColumn isKey dataField="module" dataAlign="center">Subject ID</TableHeaderColumn>
                                                <TableHeaderColumn dataField="subjectName" dataAlign="center">Subject Name</TableHeaderColumn>
                                            </BootstrapTable>
                                        </div>
                                        <div className="col-6">
                                            <h2 className="col-12 my-3"> Subjects in the Transcript</h2>
                                            <BootstrapTable version='4' className="table table-striped" data={this.transcriptData}>
                                                <TableHeaderColumn isKey dataField="subjectName" dataAlign="center">Subjects</TableHeaderColumn>
                                            </BootstrapTable>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary my-3 button" onClick={this.approve}>Approve</button>
                                    <button className="btn btn-primary my-3 button" onClick={this.transcript}>Transcript</button>

                                    {/* </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StudentRequest;