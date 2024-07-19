const mongoose = require("mongoose")
const calendarSchema = require('../models/calendarModel')


const createCalendar = async(userId)=>{

    console.log(userId)
    try{
        const collectionName = `calendar_${userId}`
        console.log(collectionName)
        CalendarModel = mongoose.model(collectionName , calendarSchema)
        console.log(CalendarModel)
        const count = await CalendarModel.countDocuments();
        if (count === 0) {
        console.log('Collection is empty');
        for (let i = 1; i <= 31; i++) {
            const calendar = new CalendarModel({ day: i });
            await calendar.save();
            console.log('Day', i, 'got created');
        }
        console.log('Calendar created successfully');
        ;}

      console.log(count)
       

    }catch(error){
        console.log(error)
    }
}



const pendingCalendar = async (req, res) => {
    const { day, id } = req.params;
    console.log(day,"dayyyyyy")
    console.log(id)
    const collectionName = `calendar_${id}`

    try {
        
            let calendarModel = mongoose.models[collectionName];
            if (!calendarModel) {
                calendarModel = mongoose.model(collectionName, calendarSchema);
                console.log(calendarModel)}

                const updatedCalendar = await calendarModel.findOneAndUpdate(
                    { day: parseInt(day, 10) }, // Convert day to an integer if needed
                    { $set: { pending: true } },
                    { new: true, useFindAndModify: false }                )
                
                if (!updatedCalendar) {
                    return res.status(404).json({ error: `Day ${day} not found in calendar ${collectionName}` });
                }
               else {
                    // Respond with success message and updated document
                    res.status(200).json({ message: 'Day status is pending', newCalendar: updatedCalendar });
        
               }
            
         

     } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const getPending = async (req, res) => {
    const { id } = req.params;
    console.log(typeof(id))
    console.log(id)
    console.log(id.length)
    const collectionName = `calendar_${id}`;
    console.log(collectionName)

    try {
        console.log('found');
        calendarModel = mongoose.model(collectionName, calendarSchema);
        console.log("im updating");
      
        const array = await calendarModel.find({ pending: true });
        const pendingDays = array.map(element => element.day);
        console.log('pending', pendingDays);
      
        const checked = await calendarModel.find({ checked: true });
        const checkedDays = checked.map(element => element.day);
        console.log('checked', checkedDays);
      
        const canceled = await calendarModel.find({ canceled: true });
        const canceledDays = canceled.map(element => element.day);
        console.log('canceled', canceledDays);
      
        
        const responseData = {
          pending: pendingDays,
          checked: checkedDays,
          canceled: canceledDays
        };
      
        
        res.json(responseData);
    }catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch pending days' });
    }
  };


  const Response = async (req,res)=>{
    const { response,day , Id } = req.params;
    console.log("im in response function ",Id)  
    if (response === 'confirm'){
        confirmDay(day,Id,res)
    }
    else{
        cancelDay(day,Id,res)
    }
}

const cancelDay= async (day,Id,res)=>{
    console.log("im updating", Id ,day)
    const collectionName = `calendar_${Id}`
try{
        CalendarModel = mongoose.model(collectionName , calendarSchema)
        console.log(CalendarModel)
        const count = await CalendarModel.countDocuments();
        if (count === 0) {
        console.log('Collection is empty');}
        else {
            const canceledArray = await CalendarModel.findOneAndUpdate(
                { pending: true, day: day }, 
                {$set : {canceled : true}},
                { new: true, useFindAndModify: false }  

            ); }                
   }catch(error){
        console.log(error)
    }
}


const confirmDay= async (day,Id,res)=>{
    console.log("im updating", Id ,day)
    const collectionName = `calendar_${Id}`
try{
        CalendarModel = mongoose.model(collectionName , calendarSchema)
        console.log(CalendarModel)
        const count = await CalendarModel.countDocuments();
        if (count === 0) {
        console.log('Collection is empty');}
        else {
            const checkedArray = await CalendarModel.findOneAndUpdate(
                { pending: true, day: day }, 
                {$set : {checked : true}},
                { new: true, useFindAndModify: false }  

            );
        }                
   }catch(error){
        console.log(error)
    }
}

const getArrays = async (users, res) => {
    try {
      console.log('found');
      console.log("I'm updating");
  
      const allUsers = [];
  
      const userPromises = users.map(async (user) => {
        const collectionName = `calendar_${user.uuid}`;
        const calendarModel = mongoose.model(collectionName, calendarSchema);
  
        try {
          const checked = await calendarModel.find({ checked: true }).select('day'); 
          const checkedDays = checked.map((element) => element.day);
          console.log('checked', checkedDays);
  
          const canceled = await calendarModel.find({ canceled: true }).select('day'); 
          const canceledDays = canceled.map((element) => element.day);
          console.log('canceled', canceledDays);
  
          allUsers.push([user.email, user.username, user.uuid, checkedDays, canceledDays]);
        } catch (err) {
          console.error(`Error processing user ${user.uuid}:`, err);
        }
      });
  
      await Promise.all(userPromises);
  
      res.json(allUsers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch pending days' });
    }
  };
  

module.exports = {
    createCalendar,
    pendingCalendar,
    getPending,
    Response,
    getArrays
}