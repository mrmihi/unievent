# ITP_WD_B01_G11

xcopy /E /I /C /EXCLUDE:exclude.txt ../y2_s2_wd_it_01-itp_wd_b01_11/Project
robocopy ./ ../y2_s2_wd_it_01-itp_wd_b01_11/Project /mir /xd node_modules
