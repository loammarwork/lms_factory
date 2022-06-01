/** @format */

export default interface SetUpDefaultDataTime {
  date: string; //YYYY-MM-DD
  line_name: string;
  operator_name: string; //john doe
  order_per_day: number;
  takt_time_line: number;
  std_cycle_time: number;
  normal_working_time: number;
  over_time: number;
  total_working_time?: number; // คำนวน
  check_work_load?: number; //คำนวณ
  percent_overload: number; //คำนวณ
  first_shift: {
    time: string; //00:00
    plan_per_hours: number; // 60 หน่วยเป็นนาที ถ้าเป็น 0 จะเป็นช่วงเบรคโดยเบรคจะมีสองช่วง ถ้าครบสองช่วงแล้วจะกลายเป็น OT
  };
  second_shift: {
    time: string; //00:00
    plan_per_hours: number; // 60 หน่วยเป็นนาที ถ้าเป็น 0 จะเป็นช่วงเบรคโดยเบรคจะมีสองช่วง ถ้าครบสองช่วงแล้วจะกลายเป็น OT
  };
}

export default interface PerformanceAnalysisBoard {
  type_process: string;
  time: string;
  plan_per_hours: number;
  plan_per_hours_collect: number;
  actual_per_hours: number;
  actual_per_hours_collect: number;
  percent_actual_workload: number; //float or double
  percent_on_process: number; //float or double
  defect: number;
  percent_defect: number; //float or double
  delay: number;
  total_diff: number;
  percent_oa_collect: number; //float or double
}

export default interface StoreSideLine {
  part_no: string;
  part_name: string;
  customer: string;
  agv_order_per_day: number;
  stock_kanban_min: number;
  stock_kanban_max: number;
  kanban_actual: number;
  unit_kanban: number;
  amount: number; // kanban_actual * unit_kanban
  stock_lt: number;
}
