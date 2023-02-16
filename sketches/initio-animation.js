const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");
const { arrayFromNumber, rangeRandom } = require("./utils/misc");

const settings = {
  dimensions: [720, 720],
  animate: true,
};

//Establishes the sketch
const sketch = ({ context, width, height }) => {
  //Establishes the center agent

  const centerAgents = [];
  //I know this isn't the cleanest way to do this
  //all below arrays store the 'outer' agents that will be drawn
  const agents = [];
  const moreAgents = [];
  const moreAgents2 = [];
  const moreAgents3 = [];
  const moreAgents4 = [];
  //positioning for center agent
  const centerX = width / 2;
  const centerY = height / 2;
  const centerAgent = new CenterAgent(centerX, centerY);
  centerAgents.push(centerAgent);

  //START - loop through arrays establish position for outer agents
  let numberOfAgents = 10;
  for (let i = 0; i < numberOfAgents; i++) {
    let x = random.range(centerX - 5, centerX + 5);
    let y = random.range(centerY - 5, centerY + 5);
    let currentItemNumber = i + 1;
    let initialTime = 0.5 + currentItemNumber;
    agents.push(new Agent(x, y, initialTime));
  }

  agents.forEach((agentClass, index) => {
    let subdotsEmptyArray = arrayFromNumber(1);

    subdotsEmptyArray.forEach((number, index2) => {
      let x = agentClass.pos.x;
      let y = agentClass.pos.y;
      let currentItemNumber = index2 + 1;
      let initialTime = 1 + currentItemNumber;
      moreAgents.push(
        new Agent(x, y, initialTime, {
          parent: "agents",
          index,
        })
      );
    });
  });

  moreAgents.forEach((agentClass, index) => {
    let randomNumber = rangeRandom(1, 3);
    let subdotsEmptyArray = arrayFromNumber(randomNumber);

    subdotsEmptyArray.forEach((number, index2) => {
      let x = agentClass.pos.x;
      let y = agentClass.pos.y;
      let currentItemNumber = index2 + 1;
      let initialTime = 4 + currentItemNumber;
      moreAgents2.push(
        new Agent(x, y, initialTime, {
          parent: "agents",
          index,
        })
      );
    });
  });

  moreAgents2.forEach((agentClass, index) => {
    let randomNumber = rangeRandom(1, 4);
    let subdotsEmptyArray = arrayFromNumber(randomNumber);

    subdotsEmptyArray.forEach((number, index2) => {
      let x = random.range(agentClass.pos.x, agentClass.pos.x);
      let y = random.range(agentClass.pos.y, agentClass.pos.y);
      let currentItemNumber = index2 + 1;
      let initialTime = 5 + currentItemNumber;
      moreAgents3.push(
        new Agent(x, y, initialTime, {
          parent: "agents",
          index,
        })
      );
    });
  });

  moreAgents3.forEach((agentClass, index) => {
    let randomNumber = rangeRandom(1, 3);
    let subdotsEmptyArray = arrayFromNumber(randomNumber);

    subdotsEmptyArray.forEach((number, index2) => {
      let x = random.range(agentClass.pos.x - 1, agentClass.pos.x + 1);
      let y = random.range(agentClass.pos.y - 1, agentClass.pos.y + 1);
      let currentItemNumber = index2 + 1;
      let initialTime = 6 + currentItemNumber;
      moreAgents4.push(
        new Agent(x, y, initialTime, {
          parent: "agents",
          index,
        })
      );
    });
  });

  // for (let i = 0; i < 10; i++) {
  //   let x = random.range(centerX - 15, centerX + 15);
  //   let y = random.range(centerY - 15, centerY + 15);
  //   let currentItemNumber = i + 1;
  //   let initialTime = 7 + currentItemNumber;
  //   moreAgents2.push(new Agent(x, y, initialTime));
  // }

  // for (let i = 0; i < 10; i++) {
  //   let x = random.range(centerX - 20, centerX + 20);
  //   let y = random.range(centerY - 20, centerY + 20);
  //   let currentItemNumber = i + 1;
  //   let initialTime = 8 + currentItemNumber;
  //   moreAgents3.push(new Agent(x, y, initialTime));
  // }

  // for (let i = 0; i < 10; i++) {
  //   let x = random.range(centerX - 25, centerX + 25);
  //   let y = random.range(centerY - 25, centerY + 25);
  //   let currentItemNumber = i + 1;
  //   let initialTime = 9 + currentItemNumber;
  //   moreAgents4.push(new Agent(x, y, initialTime));
  // }

  //END - loop through arrays establish position for outer agents

  return ({ context, width, height, time }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    //START - lines between agents
    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      //j = i+1 instead of j = 0 reduces unneeded iterations through second loop
      for (let j = i + 1; j < agents.length; j++) {
        const other = centerAgent;
        const dist = agent.pos.getDistance(other.pos);
        //draws line between agents if dist conditional met
        if (dist > 65) {
          context.lineWidth = math.mapRange(dist, 0, 225, 0.1, 0.1, 5);
          context.beginPath();
          context.moveTo(agent.pos.x, agent.pos.y);
          context.lineTo(other.pos.x, other.pos.y);
          context.stroke();
        }
      }
    }
    //lines between moreAgents
    for (let i = 0; i < moreAgents.length; i++) {
      const agent = moreAgents[i];
      //j = i+1 instead of j = 0 reduces unneeded iterations through second loop
      for (let j = i + 1; j < moreAgents.length; j++) {
        const other = agents[agent.parent.index]; //make sure there are less moreAgents than agents
        const dist = agent.pos.getDistance(centerAgent.pos);
        //draws line between agents if dist conditional met
        if (dist > 65 && other.isRender) {
          context.lineWidth = math.mapRange(dist, 0, 225, 0.1, 0.1, 5);
          context.beginPath();
          context.moveTo(agent.pos.x, agent.pos.y);
          context.lineTo(other.pos.x, other.pos.y);
          context.stroke();
        }
      }
    }

    for (let i = 0; i < moreAgents2.length; i++) {
      const agent = moreAgents2[i];
      //j = i+1 instead of j = 0 reduces unneeded iterations through second loop
      for (let j = i + 1; j < moreAgents2.length; j++) {
        const other = moreAgents[agent.parent.index]; //make sure there are less moreAgents than agents
        const dist = agent.pos.getDistance(centerAgent.pos);
        //draws line between agents if dist conditional met
        if (dist > 65 && other.isRender) {
          context.lineWidth = math.mapRange(dist, 0, 225, 0.1, 0.1, 5);
          context.beginPath();
          context.moveTo(agent.pos.x, agent.pos.y);
          context.lineTo(other.pos.x, other.pos.y);
          context.stroke();
        }
      }
    }

    for (let i = 0; i < moreAgents3.length; i++) {
      const agent = moreAgents3[i];
      //j = i+1 instead of j = 0 reduces unneeded iterations through second loop
      for (let j = i + 1; j < moreAgents3.length; j++) {
        const other = moreAgents2[agent.parent.index]; //make sure there are less moreAgents than agents
        const dist = agent.pos.getDistance(centerAgent.pos);
        //draws line between agents if dist conditional met
        if (dist > 65 && other.isRender) {
          context.lineWidth = math.mapRange(dist, 0, 225, 0.1, 0.1, 5);
          context.beginPath();
          context.moveTo(agent.pos.x, agent.pos.y);
          context.lineTo(other.pos.x, other.pos.y);
          context.stroke();
        }
      }
    }

    for (let i = 0; i < moreAgents4.length; i++) {
      const agent = moreAgents4[i];
      //j = i+1 instead of j = 0 reduces unneeded iterations through second loop
      for (let j = i + 1; j < moreAgents4.length; j++) {
        const other = moreAgents3[agent.parent.index]; //make sure there are less moreAgents than agents
        const dist = agent.pos.getDistance(centerAgent.pos);
        //draws line between agents if dist conditional met
        if (dist > 65 && other.isRender) {
          context.lineWidth = math.mapRange(dist, 0, 225, 0.1, 0.1, 5);
          context.beginPath();
          context.moveTo(agent.pos.x, agent.pos.y);
          context.lineTo(other.pos.x, other.pos.y);
          context.stroke();
        }
      }
    }

    // for (let i = 0; i < moreAgents2.length; i++) {
    //   const agent = moreAgents2[i];
    //   //j = i+1 instead of j = 0 reduces unneeded iterations through second loop
    //   for (let j = i + 1; j < moreAgents2.length; j++) {
    //     const other = moreAgents[i]; //make sure there are less moreAgents than agents
    //     const dist = agent.pos.getDistance(other.pos);
    //     //draws line between agents if dist conditional met
    //     if (dist > 65 && other.isRender) {
    //       context.lineWidth = math.mapRange(dist, 0, 225, 0.1, 0.1, 5);
    //       context.beginPath();
    //       context.moveTo(agent.pos.x, agent.pos.y);
    //       context.lineTo(other.pos.x, other.pos.y);

    //       context.stroke();
    //     }
    //   }
    // }

    // for (let i = 0; i < moreAgents3.length; i++) {
    //   const agent = moreAgents3[i];
    //   //j = i+1 instead of j = 0 reduces unneeded iterations through second loop
    //   for (let j = i + 1; j < moreAgents3.length; j++) {
    //     const other = moreAgents2[i]; //make sure there are less moreAgents than agents
    //     const dist = agent.pos.getDistance(other.pos);
    //     //draws line between agents if dist conditional met
    //     if (dist > 65) {
    //       context.lineWidth = math.mapRange(dist, 0, 225, 0.1, 0.1, 5);
    //       context.beginPath();
    //       context.moveTo(agent.pos.x, agent.pos.y);
    //       context.lineTo(other.pos.x, other.pos.y);
    //       context.stroke();
    //     }
    //   }
    // }

    // for (let i = 0; i < moreAgents4.length; i++) {
    //   const agent = moreAgents4[i];
    //   //j = i+1 instead of j = 0 reduces unneeded iterations through second loop
    //   for (let j = i + 1; j < moreAgents4.length; j++) {
    //     const other = moreAgents3[i]; //make sure there are less moreAgents than agents
    //     const dist = agent.pos.getDistance(other.pos);
    //     //draws line between agents if dist conditional met
    //     if (dist > 65) {
    //       context.lineWidth = math.mapRange(dist, 0, 225, 0.1, 0.1, 5);
    //       context.beginPath();
    //       context.moveTo(agent.pos.x, agent.pos.y);
    //       context.lineTo(other.pos.x, other.pos.y);
    //       context.stroke();
    //     }
    //   }
    // }
    //END - lines between agents

    //draw center agent
    centerAgents.forEach((CenterAgent) => {
      CenterAgent.draw(context);
      CenterAgent.update();
    });

    // //draws each agent in agents array with a delay (in theory..)

    // [NEW] This method will wait untill all the promises are resolved
    // We use the map method to convert each agent into a promise
    // Each promise will wait unitl the setTimeout is finished, run the draw functions and fullfill the promise

    // agents.forEach(function(agent, i) {
    //   setTimeout(function() {
    //     agent.draw(context);
    //     agent.update();
    //     agent.bounce(width, height);
    //   }, 500 * (i + 1));
    // });

    // Promise.all(agents.map(drawAgent)).then((arrayOfPromises) => {
    //   // The value of arrayOfPromises is an Array of the response of the Promises, in this case is the agent
    //   console.log(`Yay! We draw all the agents`);
    //   console.log(`[Results] => `, arrayOfPromises);
    // });

    //START - drawing each agent in the arrays

    agents.forEach((agent, i) => {
      agent.draw(context, time);
      agent.update();
      agent.bounce(width, height);
    });

    moreAgents.forEach((agent, i) => {
      const parentAgent = agents[agent.parent.index];
      if (parentAgent.isRender) {
        agent.draw(context, time, parentAgent.pos);
        agent.update();
        agent.bounce(width, height);
      }
    });

    moreAgents2.forEach((agent, i) => {
      const parentAgent = moreAgents[agent.parent.index];
      if (parentAgent.isRender) {
        agent.draw(context, time, parentAgent.pos);
        agent.update();
        agent.bounce(width, height);
      }
    });

    moreAgents3.forEach((agent, i) => {
      const parentAgent = moreAgents2[agent.parent.index];
      if (parentAgent.isRender) {
        agent.draw(context, time, parentAgent.pos);
        agent.update();
        agent.bounce(width, height);
      }
    });

    moreAgents4.forEach((agent, i) => {
      const parentAgent = moreAgents3[agent.parent.index];
      if (parentAgent.isRender) {
        agent.draw(context, time, parentAgent.pos);
        agent.update();
        agent.bounce(width, height);
      }
    });

    // moreAgents2.forEach((agent, i) => {
    //   agent.draw(context, time);
    //   agent.update();
    //   agent.bounce(width, height);
    // });

    // moreAgents3.forEach((agent, i) => {
    //   agent.draw(context, time);
    //   agent.update();
    //   agent.bounce(width, height);
    // });

    // moreAgents4.forEach((agent, i) => {
    //   agent.draw(context, time);
    //   agent.update();
    //   agent.bounce(width, height);
    // });
    //END - drawing each agent in the arrays
  };
};

canvasSketch(sketch, settings);

//classes

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Agent {
  constructor(x, y, initialTime, parent) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-0.8, 0.8), random.range(-0.8, 0.8));
    this.radius = random.range(2, 3);
    this.initialTime = initialTime;
    this.isRender = false;
    this.parent = parent;
  }

  bounce(width, height) {
    if (this.isRender) {
      if (this.pos.x <= 10 || this.pos.x >= width) this.vel.x *= -1;
      if (this.pos.y <= 10 || this.pos.y >= height) this.vel.y *= -1;
    }
  }

  //wrap is alternate to bounce - personal preference for bounce
  //to switch, change bounce() call in agents forEach() loop to wrap()
  wrap(width, height) {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.y > height) this.pos.y = 0;
  }

  update(hardcodedVel) {
    if (this.isRender) {
      let vel = hardcodedVel || this.vel;
      this.pos.x += vel.x;
      this.pos.y += vel.y;
    }
  }

  draw(context, time, parentPosition) {
    context.save();

    if (time >= this.initialTime) {
      if (!this.isRender && parentPosition) {
        this.pos.x = parentPosition.x;
        this.pos.y = parentPosition.y;
      }
      this.isRender = true;
      context.translate(this.pos.x, this.pos.y);
      context.lineWidth = 1.5;
      context.beginPath();
      context.arc(0, 0, this.radius, 0, Math.PI * 2); //makes the circles
      context.fill();
      context.stroke();
    }
    context.restore();
  }
}

class CenterAgent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(0, 0);
    this.radius = random.range(4, 5);
  }

  bounce(width, height) {
    if (this.pos.x <= 10 || this.pos.x >= width) this.vel.x *= -1;
    if (this.pos.y <= 10 || this.pos.y >= height) this.vel.y *= -1;
  }

  //wrap is alternate to bounce - personal preference for bounce
  //to switch, change bounce() call in agents forEach() loop to wrap()
  wrap(width, height) {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.y > height) this.pos.y = 0;
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y);
    context.lineWidth = 1.5;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2); //makes the circles
    context.fill();
    context.stroke();
    context.restore();
  }
}
