function Accordion(el, config){
}

const accordion = new Accordeon(
                        document.getElementById('container'),
                        {collapseOther: true}
                    );

accordion.open(0);
accordion.close(0);
accordion.toggle(1);