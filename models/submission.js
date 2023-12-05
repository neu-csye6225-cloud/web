import  sequelize  from "../config/database.js";
import { DataTypes } from "sequelize";
export const Submission = sequelize.define( "Submission",{

      assignment_id:  {
        type: DataTypes.UUID,
        allowNull: false,
        validate:{
            notEmpty:true,
        },
        readOnly:true,
      },

      submission_url:  {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true,
        },
        readOnly:true,
      },
      submission_date:  {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        readOnly:true,
    },
    submission_updated : {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        readOnly:true,
    }
});